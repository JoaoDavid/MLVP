from mlvp.antlr.CodeGenerator import CodeGenerator
from mlvp.antlr.ValidatorAST import ValidatorAST
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *
from mlvp.antlr.AntlrHandler import build_ast

CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"
PANDAS_VAR = "pd"


class FeatureEngineering(Node):

    def __init__(self, data):
        super().__init__(data)
        self.lines = data['lines']
        self.ast, self.error_msg = build_ast(self.lines)
        self.ast_validator = None

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
        code_generator = CodeGenerator(self.ast, out_file, df)
        if self.ast is not None:
            code_generator.generate()

        out_file.write("\n")
        out_file.write(X.format(x=x, df=df, old_y=old_y))
        out_file.write(Y.format(y=y, df=df, old_y=old_y))

        out_ds = self.get_port(False, "Engineered Dataset")
        emitter.set(out_ds, (x, y))

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Engineered Dataset")
        input_ds = Dataset(input_port.port_id)
        output_port.categories = input_port.categories
        output_port.encoded_columns = input_port.encoded_columns
        output_port.columns = input_port.columns

        if self.all_input_ports_linked():
            self.ast_validator = ValidatorAST(self.ast, input_ds.dataset, output_port.columns)
            if self.ast is not None:
                self.ast_validator.validate_ast()

        if len(input_port.columns) > 0:
            last = list(input_port.columns.items())[-1]
            del output_port.columns[last[0]]
            output_port.columns[last[0]] = last[1]

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Engineered Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        z3_has_errors = Bool(NODE_PROP.format(name="has_no_errors", node_id=self.node_id))
        ast_assertions = self.ast_validator.assertions if self.ast_validator is not None else []

        return [
            input_ds.cols + len(output_port.columns) == output_ds.cols,  # TODO, depends on the number of columns added
            input_ds.rows == output_ds.rows,
            input_ds.n_labels == output_ds.n_labels,
            input_ds.max_label_count == output_ds.max_label_count,
            input_ds.min_label_count == output_ds.min_label_count,
            input_ds.balanced == output_ds.balanced,
            input_ds.time_series == output_ds.time_series,
            input_ds.dataset == output_ds.dataset,
            z3_has_errors == (len(self.error_msg) == 0),
            z3_has_errors,
        ] + ast_assertions
