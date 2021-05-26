from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE = "{df} = pd.concat([{x},{y}], join = 'outer', axis = 1)\n"
PRINT = "print({df})\n"
PANDAS_VAR = "pd"


class VisualizeDataset(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self, packages):
        packages.add(IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        df = "df" + str(curr_count)

        out_file.write(CONCATENATE.format(df=df, x=x, y=y))
        out_file.write(PRINT.format(df=df))

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        node_columns[self.node_id] = input_port.columns

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        input_ds = Dataset(input_port.port_id)

        return [

        ]
