from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
DECODED = "{decoded} = pd.Series({dummies}.columns[np.where({dummies}!=0)[1]])\n"
INDEX = "{index} = {df}.columns.get_loc(\'{category}\')\n"
INSERT = "{df}.insert(loc={index}, column=\'{encoded_column}\', value={decoded})\n"
DROP = "{df} = {df}.drop(columns={categories})\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"

DUPLICATE_COLUMN = "column \"{column_name}\" is unique on the dataset"


class OneHotDecoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.encoded_column = data['encodedColumn']
        self.categories = []
        self.decodable_columns = {}

    def import_dependency(self):
        return IMPORT_AS.format(lib_name="numpy", lib_var="np")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        dummies = emitter.get(self.encoded_column)
        decoded = "decoded" + str(curr_count)
        index = "index" + str(curr_count)
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        print(self.categories)
        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        out_file.write(DECODED.format(decoded=decoded, dummies=dummies))
        out_file.write(INDEX.format(index=index, df=df, category=self.categories[0]))
        out_file.write(INSERT.format(df=df, index=index, encoded_column=self.encoded_column, decoded=decoded))
        out_file.write(DROP.format(df=df, categories=self.categories))
        out_file.write(X.format(x=x, df=df, old_y=old_y))
        out_file.write(Y.format(y=y, df=df, old_y=old_y))

        out_ds = self.get_port(False, "Decoded Dataset")
        emitter.set(out_ds, (x, y))

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Decoded Dataset")
        output_port.categories = input_port.categories.copy()
        output_port.encoded_columns = input_port.encoded_columns.copy()

        for col_name, tuple_encoded in input_port.encoded_columns.items():
            if tuple_encoded[0] == "one-hot-encoded":
                self.decodable_columns [col_name] = tuple_encoded[2]
        node_columns[self.node_id] = self.decodable_columns

        if self.encoded_column in input_port.encoded_columns:
            self.categories = input_port.categories[self.encoded_column]
            del output_port.encoded_columns[self.encoded_column]

        for col_name, col_type in input_port.columns.items():
            if col_name in self.categories:
                output_port.columns[self.encoded_column] = "string"
            else:
                output_port.columns[col_name] = col_type

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Decoded Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)
        self.data_flow(node_columns)

        aux_assertions = []
        if len(input_port.columns) > 0:
            if self.encoded_column in input_port.encoded_columns:
                z3_duplicate_column = Bool(DUPLICATE_COLUMN.format(column_name=self.encoded_column))
                aux_assertions.append(z3_duplicate_column == (self.encoded_column not in input_port.columns))
                aux_assertions.append(z3_duplicate_column)

            if len(self.decodable_columns) == 0:
                z3_num_encoded_cols = Int(NODE_PROP.format(name="num_decodable_columns", node_id=self.node_id))
                encoded_cols = len(self.decodable_columns)
                aux_assertions.append(z3_num_encoded_cols == encoded_cols)
                aux_assertions.append(z3_num_encoded_cols > 0)

        return [
                   output_ds.cols == len(output_port.columns),
                   output_ds.rows == input_ds.rows,
                   output_ds.n_labels == input_ds.n_labels,
                   output_ds.max_label_count == input_ds.max_label_count,
                   output_ds.min_label_count == input_ds.min_label_count,
                   output_ds.balanced == input_ds.balanced,
                   output_ds.time_series == input_ds.time_series,
                   output_ds.dataset == input_ds.dataset,
               ] + aux_assertions
