from mlvp.codegen import *
from mlvp.ast.nodes.Node import *
from mlvp.typecheck import *
from mlvp.antlr.AntlrHandler import parse_text

CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"
PANDAS_VAR = "pd"


class FeatureEngineering(Node):

    def __init__(self, data):
        super().__init__(data)
        self.lines = data['lines']
        print(self.lines)

    def import_dependency(self):
        return IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)

        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        # for line in self.lines:
        #     out_file.write(line)
        out_file.write(self.lines)
        out_file.write("\n")
        out_file.write(X.format(x=x, df=df, old_y=old_y))
        out_file.write(Y.format(y=y, df=df, old_y=old_y))

        out_ds = self.get_port(False, "Engineered Dataset")
        emitter.set(out_ds, (x, y))

    def assertions(self):
        id_input = self.get_port(True, "Dataset").port_id
        id_output = self.get_port(False, "Engineered Dataset").port_id
        input_ds = Dataset(id_input)
        output_ds = Dataset(id_output)

        col_assertions = parse_text(self.lines, input_ds.dataset)

        return [
            input_ds.cols == output_ds.cols,  # TODO, depends on the number of columns added
            input_ds.rows == output_ds.rows,
            input_ds.n_labels == output_ds.n_labels,
            input_ds.max_label_count == output_ds.max_label_count,
            input_ds.min_label_count == output_ds.min_label_count,
            input_ds.balanced == output_ds.balanced,
            input_ds.time_series == output_ds.time_series,
        ] + col_assertions
