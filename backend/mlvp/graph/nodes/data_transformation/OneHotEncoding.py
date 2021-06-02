from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *


CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
INDEX = "{index} = {df}.columns.get_loc(\'{original_column}\')\n"
DF_LEFT = "{df_left} = {df}.iloc[:, 0:{index}]\n"
DF_RIGHT = "{df_right} = {df}.iloc[:, {index}+1:]\n"
DUMMIES = "{dummies} = pd.get_dummies({df}[\'{original_column}\'])\n"
UNIQUE = "{unique_labels} = {df}[\'{original_column}\'].unique()\n"
FINAL_CONCATENATE = "{df_final} = pd.concat([{df_left}, {dummies}, {df_right}], join = 'outer', axis = 1)\n"
X = "{x} = {df_final}.drop({df_final}.columns[-1], axis=1)\n"
Y = "{y} = {df_final}[{df_final}.columns[-1]]\n"

NONEXISTENT_COLUMN = "column \"{column_name}\" exists on the dataset"
DUPLICATE_COLUMN = "column \"{column_name}\" is unique on the dataset"


class OneHotEncoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.original_column = data['originalColumn']
        self.encoded_column = self.original_column + "_one_hot_encoded"
        self.encodable_columns = {}

    def import_dependency(self, packages):
        packages.add(IMPORT_AS.format(lib_name="numpy", lib_var="np"))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        df = "df" + str(curr_count)
        index = "index" + str(curr_count)
        df_left = "df_left" + str(curr_count)
        df_right = "df_right" + str(curr_count)
        dummies = "dummies" + str(curr_count)
        unique_labels = "unique_labels" + str(curr_count)
        df_final = "df_final" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)

        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        out_file.write(INDEX.format(index=index, df=df, original_column=self.original_column))
        out_file.write(DF_LEFT.format(df_left=df_left, df=df, index=index))
        out_file.write(DF_RIGHT.format(df_right=df_right, df=df, index=index))
        out_file.write(DUMMIES.format(dummies=dummies, df=df, original_column=self.original_column))
        out_file.write(UNIQUE.format(unique_labels=unique_labels, df=df, original_column=self.original_column))
        out_file.write(FINAL_CONCATENATE.format(df_final=df_final, df_left=df_left, dummies=dummies, df_right=df_right))
        out_file.write(X.format(x=x, df_final=df_final))
        out_file.write(Y.format(y=y, df_final=df_final))

        out_ds = self.get_port(False, "Encoded Dataset")
        emitter.set(out_ds, (x, y))
        emitter.set(self.encoded_column, unique_labels)

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
                output_port.columns[self.encoded_column] = "one_hot_encoded"
            else:
                output_port.columns[col_name] = col_type

        if self.original_column in input_port.columns:
            output_port.encoded_columns[self.encoded_column] = ("one_hot_encoded", input_port.columns[self.original_column], self.encoded_column)

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Encoded Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        aux_assertions = []
        if len(input_port.columns) > 0:
            z3_duplicate_column = Bool(DUPLICATE_COLUMN.format(column_name=self.encoded_column))
            duplicate_column = self.encoded_column not in input_port.columns
            nonexistent_column = self.original_column in input_port.columns
            aux_assertions = [
                z3_duplicate_column == duplicate_column,
                z3_duplicate_column,
                column(input_ds.dataset, String(self.encoded_column)) == get_col_type("one_hot_encoded"),
            ]
            if len(self.encodable_columns) == 0:
                z3_num_encodable_cols = Int(NODE_PROP.format(name="num_encodable_cols", node_id=self.node_id))
                aux_assertions.append(z3_num_encodable_cols == len(self.encodable_columns))
                aux_assertions.append(z3_num_encodable_cols > 0)
            else:
                z3_nonexistent_column = Bool(NONEXISTENT_COLUMN.format(column_name=self.original_column))
                aux_assertions.append(z3_nonexistent_column == nonexistent_column)
                aux_assertions.append(z3_nonexistent_column)

        return [
                   output_ds.cols == len(output_port.columns),
                   output_ds.rows == input_ds.rows,
                   output_ds.n_labels == input_ds.n_labels,
                   output_ds.max_label_count == input_ds.max_label_count,
                   output_ds.min_label_count == input_ds.min_label_count,
                   output_ds.balanced == input_ds.balanced,
                   output_ds.time_series == input_ds.time_series,
                   output_ds.dataset == input_ds.dataset,
                   output_ds.reduced == input_ds.reduced,
                   output_ds.processed == True,
        ] + aux_assertions
