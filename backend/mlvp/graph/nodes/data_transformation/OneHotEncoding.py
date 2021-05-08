from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *


CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
INDEX = "{index} = {df}.columns.get_loc(\'{original_column}\')\n"
DF_LEFT = "{df_left} = {df}.iloc[:, 0:{index}]\n"
DF_RIGHT = "{df_right} = {df}.iloc[:, {index}+1:]\n"
DUMMIES = "{dummies} = pd.get_dummies({df}[\'{original_column}\'])\n"
FINAL_CONCATENATE = "{df_final} = pd.concat([{df_left}, {dummies}, {df_right}], join = 'outer', axis = 1)\n"
X = "{x} = {df_final}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df_final}[{old_y}.name]\n"


class OneHotEncoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.original_column = data['originalColumn']
        # TODO

    def import_dependency(self):
        return IMPORT_AS.format(lib_name="numpy", lib_var="np")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        df = "df" + str(curr_count)
        index = "index" + str(curr_count)
        df_left = "df_left" + str(curr_count)
        df_right = "df_right" + str(curr_count)
        dummies = "dummies" + str(curr_count)
        df_final = "df_final" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)

        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        out_file.write(INDEX.format(index=index, df=df, original_column=self.original_column))
        out_file.write(DF_LEFT.format(df_left=df_left, df=df, index=index))
        out_file.write(DF_RIGHT.format(df_right=df_right, df=df, index=index))
        out_file.write(DUMMIES.format(dummies=dummies, df=df, original_column=self.original_column))
        out_file.write(FINAL_CONCATENATE.format(df_final=df_final, df_left=df_left, dummies=dummies, df_right=df_right))
        out_file.write(X.format(x=x, df_final=df_final, old_y=old_y))
        out_file.write(Y.format(y=y, df_final=df_final, old_y=old_y))

        out_ds = self.get_port(False, "Encoded Dataset")
        emitter.set(out_ds, (x, y))
        emitter.set(self.encoded_column, dummies)  # TODO

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Encoded Dataset")
        output_port.categories = input_port.categories.copy()
        output_port.encoded_columns = input_port.encoded_columns.copy()

        encodable_columns = {}
        for col_name, col_type in input_port.columns.items():
            if col_type == "string":
                encodable_columns[col_name] = col_type
        node_columns[self.node_id] = encodable_columns

        for col_name, col_type in input_port.columns.items():
            if col_name == self.original_column:
                if self.original_column in input_port.categories:
                    for category in input_port.categories[self.original_column]:
                        output_port.columns[category] = "int"
            else:
                output_port.columns[col_name] = col_type

        if self.original_column in output_port.categories:
            output_port.encoded_columns[self.original_column] = input_port.categories[self.original_column]
            del output_port.categories[self.original_column]

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Encoded Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)
        self.data_flow(node_columns)

        # TODO

        return [
            # TODO
        ]
