from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
INVERSE_TRANSFORM = "{df}['{encoded_column}'] = {le}.inverse_transform({df}['{encoded_column}'])\n"
RENAME_COLUMN = "{df} = {df}.rename(columns={{'{encoded_column}': '{original_column}'}})\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"

NONEXISTENT_COLUMN = "column \"{column_name}\" exists on the dataset"
DUPLICATE_COLUMN = "column \"{column_name}\" is unique on the dataset"


class LabelDecoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.encoded_column = data['encodedColumn']
        self.original_column = self.encoded_column.replace("_encoded", "")

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.preprocessing", class_to_import="LabelEncoder")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        le = emitter.get(self.encoded_column)

        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        out_file.write(INVERSE_TRANSFORM.format(le=le, df=df, encoded_column=self.encoded_column))
        out_file.write(RENAME_COLUMN.format(df=df, original_column=self.original_column, encoded_column=self.encoded_column))
        out_file.write(X.format(x=x, df=df, old_y=old_y))
        out_file.write(Y.format(y=y, df=df, old_y=old_y))

        out_ds = self.get_port(False, "Decoded Dataset")
        emitter.set(out_ds, (x, y))

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Decoded Dataset")

        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        for col_name, col_type in input_port.columns.items():
            if col_name == self.encoded_column:
                output_port.columns[self.original_column] = input_port.label_encoded[self.encoded_column][1]
            else:
                output_port.columns[col_name] = col_type

        print(input_port.label_encoded)
        this_node_columns = {}
        for key, value in input_port.label_encoded.items():
            this_node_columns[key] = value[0]
        node_columns[self.node_id] = this_node_columns

        z3_duplicate_column = Bool(DUPLICATE_COLUMN.format(column_name=self.original_column))
        z3_nonexistent_column = Bool(NONEXISTENT_COLUMN.format(column_name=self.encoded_column))
        duplicate_column = True

        assert_existent_column = []
        if len(input_port.columns) > 0:
            output_port.label_encoded = input_port.label_encoded
            if self.encoded_column in output_port.label_encoded:
                del output_port.label_encoded[self.encoded_column]

            duplicate_column = self.original_column not in input_port.columns
            nonexistent_column = self.encoded_column in input_port.columns
            assert_existent_column = [
                z3_nonexistent_column == nonexistent_column,
                z3_nonexistent_column,
                z3_duplicate_column == duplicate_column,
                z3_duplicate_column,
                column(input_ds.dataset, String(self.encoded_column)) == get_col_type("int"),
            ]
            if len(input_port.label_encoded) == 0:
                z3_num_encoded_cols = Int(NODE_PROP.format(name="num_encoded_cols", node_id=self.node_id))
                encoded_cols = len(input_port.label_encoded) > 0
            assert_existent_column.append(z3_num_encoded_cols == encoded_cols)
            assert_existent_column.append(z3_num_encoded_cols > 0)
            
        return [
            output_ds.cols == input_ds.cols,
            output_ds.rows == input_ds.rows,
            output_ds.n_labels == input_ds.n_labels,
            output_ds.max_label_count == input_ds.max_label_count,
            output_ds.min_label_count == input_ds.min_label_count,
            output_ds.balanced == input_ds.balanced,
            output_ds.time_series == input_ds.time_series,
            output_ds.dataset == input_ds.dataset,
        ] + assert_existent_column
