from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE_V = "{df} = pd.concat([{x},{y}], join = 'outer', axis = 1)\n"
CONCATENATE_H = "{df} = pd.concat([{top_df},{bot_df}])\n"
X = "{x} = {df}.drop({df}.columns[-1], axis=1)\n"
Y = "{y} = {df}[{df}.columns[-1]]\n"


class HorizontalConcatenation(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self, packages):
        pass

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        for curr in self.parent_links:
            parent_port = curr.source_port
            target_port = curr.target_port
            print(parent_port)
            if target_port.name == "Top Dataset":
                top_x, top_y = emitter.get(parent_port)
            elif target_port.name == "Bottom Dataset":
                bot_x, bot_y = emitter.get(parent_port)

        top_df = "top_df" + str(curr_count)
        bot_df = "bot_df" + str(curr_count)
        final_df = "final_df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        out_file.write(CONCATENATE_V.format(df=top_df, x=top_x, y=top_y))
        out_file.write(CONCATENATE_V.format(df=bot_df, x=bot_x, y=bot_y))
        out_file.write(CONCATENATE_H.format(df=final_df, top_df=top_df, bot_df=bot_df))
        out_file.write(X.format(x=x, df=final_df))
        out_file.write(Y.format(y=y, df=final_df))

        out_ds = self.get_port(False, "Concatenated Dataset")
        emitter.set(out_ds, (x, y))

    def data_flow(self, node_columns):
        top_input_port = self.get_port(True, "Top Dataset")
        bot_input_port = self.get_port(True, "Bottom Dataset")
        output_port = self.get_port(False, "Concatenated Dataset")
        output_port.encoded_columns = top_input_port.encoded_columns
        output_port.columns = top_input_port.columns

    def assertions(self):
        top_input_port = self.get_port(True, "Top Dataset")
        bot_input_port = self.get_port(True, "Bottom Dataset")
        output_port = self.get_port(False, "Concatenated Dataset")
        top_input_ds = Dataset(top_input_port.port_id)
        bot_input_ds = Dataset(bot_input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        aux_assertions = []
        if len(top_input_port.columns) > 0 and len(bot_input_port.columns) > 0:
            if len(top_input_port.columns) == len(bot_input_port.columns):
                z3_equal_input_columns = Bool(NODE_PROP.format(name="input_columns are_equal", node_id=self.node_id))
                top_column = [(col_name, col_type) for col_name, col_type in top_input_port.columns.items()]
                bot_column = [(col_name, col_type) for col_name, col_type in bot_input_port.columns.items()]
                equal_input_columns = len(set(top_column) - set(bot_column)) == 0
                aux_assertions = [
                    z3_equal_input_columns == equal_input_columns,
                    z3_equal_input_columns,
                ]

        col_assertions = []
        column_names = []
        column_types = []
        for col_name, col_type in output_port.columns.items():
            column_names.append(String(col_name))
            column_types.append(get_col_type(col_type))

        for i in range(len(output_port.columns)):
            col_assertions.append(column(output_ds.dataset, column_names[i]) == column_types[i])

        return aux_assertions + [
            # requires
            top_input_ds.cols == bot_input_ds.cols,
            # ensures
            output_ds.cols == top_input_ds.cols,
            output_ds.cols == bot_input_ds.cols,
            output_ds.rows == top_input_ds.rows + bot_input_ds.rows,
            # output_ds.balanced == And(top_input_ds.balanced, bot_input_ds.balanced),
            output_ds.time_series == False,
            output_ds.reduced == False,
            output_ds.processed == True,
        ] + col_assertions
