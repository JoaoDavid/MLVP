from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE = "{df} = pd.concat([{left_x},{left_y},{right_x},{right_y}], join = 'outer', axis = 1)\n"
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
            if target_port.name == "Left Dataset":
                left_x, left_y = emitter.get(parent_port)
            elif target_port.name == "Right Dataset":
                right_x, right_y = emitter.get(parent_port)

        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        out_file.write(CONCATENATE.format(df=df, left_x=left_x, left_y=left_y, right_x=right_x, right_y=right_y))
        out_file.write(X.format(x=x, df=df))
        out_file.write(Y.format(y=y, df=df))

        out_ds = self.get_port(False, "Concatenated Dataset")
        emitter.set(out_ds, (x, y))

    def data_flow(self, node_columns):
        left_input_port = self.get_port(True, "Left Dataset")
        right_input_port = self.get_port(True, "Right Dataset")
        output_port = self.get_port(False, "Concatenated Dataset")
        output_port.encoded_columns = {**left_input_port.encoded_columns, **right_input_port.encoded_columns}
        # output_port.columns = {**left_input_port.columns, **right_input_port.columns}
        from collections import OrderedDict
        ordered_dict = OrderedDict()
        for col_name, col_type in right_input_port.columns.items():
            # output_port.columns[col_name] = col_type
            ordered_dict[col_name] = col_type
        for col_name, col_type in left_input_port.columns.items():
            # output_port.columns[col_name] = col_type
            ordered_dict[col_name] = col_type

        output_port.columns = ordered_dict
        print(ordered_dict)

    def assertions(self):
        left_input_port = self.get_port(True, "Left Dataset")
        right_input_port = self.get_port(True, "Right Dataset")
        output_port = self.get_port(False, "Concatenated Dataset")
        left_input_ds = Dataset(left_input_port.port_id)
        right_input_ds = Dataset(right_input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        aux_assertions = []
        if len(left_input_port.columns) > 0 and len(right_input_port.columns) > 0:
            z3_duplicate_column = Bool(NODE_PROP.format(name="unique_columns_from_input_ports", node_id=self.node_id))
            duplicate_column = len(output_port.columns) == len(left_input_port.columns) + len(right_input_port.columns)
            aux_assertions = [
                z3_duplicate_column == duplicate_column,
                z3_duplicate_column,
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
            left_input_ds.rows == right_input_ds.rows,
            # ensures
            output_ds.cols == left_input_ds.cols + right_input_ds.cols,
            output_ds.rows == left_input_ds.rows,
            output_ds.rows == right_input_ds.rows,
            output_ds.n_labels == right_input_ds.n_labels,
            output_ds.max_label_count == right_input_ds.max_label_count,
            output_ds.min_label_count == right_input_ds.min_label_count,
            output_ds.balanced == right_input_ds.balanced,
            output_ds.time_series == And(left_input_ds.time_series, right_input_ds.time_series),
            output_ds.reduced == False,
            output_ds.processed == True,

        ] + col_assertions
