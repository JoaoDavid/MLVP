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


class OneHotDecoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.encoded_column = data['encodedColumn']
        self.categories = []

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
        output_port.columns = input_port.columns.copy()

        decodable_columns = {}
        for col_name, tuple_encoded in input_port.encoded_columns.items():
            if tuple_encoded[0] == "one-hot-encoded":
                decodable_columns[col_name] = tuple_encoded[1]
        node_columns[self.node_id] = decodable_columns
        self.categories = input_port.categories[self.encoded_column]

        if self.encoded_column in input_port.encoded_columns:
            del output_port.encoded_columns[self.encoded_column]

        for col_name, col_type in input_port.columns.items():
            if col_name in input_port.encoded_columns:
                output_port.columns[self.encoded_column] = "string"
            else:
                output_port.columns[col_name] = col_type

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Decoded Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)
        self.data_flow(node_columns)

        # TODO

        return [
            # TODO
        ]
