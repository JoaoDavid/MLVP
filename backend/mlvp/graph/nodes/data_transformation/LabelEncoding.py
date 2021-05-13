from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
LABEL_ENCODER_INIT = "{le} = LabelEncoder()\n"
TRANSFORM = "{df}['{original_column}'] = {le}.fit_transform({df}['{original_column}'])\n"
RENAME_COLUMN = "{df} = {df}.rename(columns={{'{original_column}': '{encoded_column}'}})\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"

NONEXISTENT_COLUMN = "column \"{column_name}\" exists on the dataset"
DUPLICATE_COLUMN = "column \"{column_name}\" is unique on the dataset"


class LabelEncoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.original_column = data['originalColumn']
        self.encoded_column = self.original_column + "_encoded"
        self.encodable_columns = {}

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.preprocessing", class_to_import="LabelEncoder")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        le = "le" + str(curr_count)

        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        out_file.write(LABEL_ENCODER_INIT.format(le=le))
        out_file.write(TRANSFORM.format(le=le, df=df, original_column=self.original_column))
        out_file.write(RENAME_COLUMN.format(df=df, original_column=self.original_column, encoded_column=self.encoded_column))
        out_file.write(X.format(x=x, df=df, old_y=old_y))
        out_file.write(Y.format(y=y, df=df, old_y=old_y))

        out_ds = self.get_port(False, "Encoded Dataset")
        emitter.set(out_ds, (x, y))
        emitter.set(self.encoded_column, le)

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Encoded Dataset")
        output_port.encoded_columns = input_port.encoded_columns.copy()

        # get all columns originated by an encoding
        encoded_columns = []
        for col_name, tuple_encoded in input_port.encoded_columns.items():
            encoded_columns += tuple_encoded[2]
            encoded_columns.append(col_name)

        for col_name, col_type in input_port.columns.items():
            if (col_type == "int" or col_type == "string") and col_name not in encoded_columns:
                self.encodable_columns[col_name] = col_type
        node_columns[self.node_id] = self.encodable_columns

        for col_name, col_type in input_port.columns.items():
            if col_name == self.original_column:
                output_port.columns[self.encoded_column] = "int"
            else:
                output_port.columns[col_name] = col_type

        if self.original_column in input_port.columns:
            output_port.encoded_columns[self.encoded_column] = ("label_encoded", input_port.columns[self.original_column], self.encoded_column)

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Encoded Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        z3_duplicate_column = Bool(DUPLICATE_COLUMN.format(column_name=self.encoded_column))
        z3_nonexistent_column = Bool(NONEXISTENT_COLUMN.format(column_name=self.original_column))

        aux_assertions = []
        if len(input_port.columns) > 0:
            duplicate_column = self.encoded_column not in input_port.columns
            nonexistent_column = self.original_column in input_port.columns
            aux_assertions = [
                z3_nonexistent_column == nonexistent_column,
                z3_nonexistent_column,
                z3_duplicate_column == duplicate_column,
                z3_duplicate_column,
                column(input_ds.dataset, String(self.encoded_column)) == get_col_type("int"),
            ]
            if len(self.encodable_columns) == 0:
                z3_num_encodable_cols = Int(NODE_PROP.format(name="num_encodable_cols", node_id=self.node_id))
                aux_assertions.append(z3_num_encodable_cols == len(self.encodable_columns))
                aux_assertions.append(z3_num_encodable_cols > 0)

        return [
            output_ds.cols == input_ds.cols,
            output_ds.rows == input_ds.rows,
            output_ds.n_labels == input_ds.n_labels,
            output_ds.max_label_count == input_ds.max_label_count,
            output_ds.min_label_count == input_ds.min_label_count,
            output_ds.balanced == input_ds.balanced,
            output_ds.time_series == input_ds.time_series,
            output_ds.dataset == input_ds.dataset,
        ] + aux_assertions
