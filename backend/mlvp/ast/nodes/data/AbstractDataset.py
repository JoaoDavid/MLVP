from mlvp.ast.nodes.Node import Node
from mlvp.codegen import Emitter
from mlvp.typecheck import *


class AbstractDataset(Node):

    def __init__(self, data):
        super().__init__(data)
        self.num_cols = data['numCols']
        self.num_rows = data['numRows']

    def import_dependency(self):
        return ""

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        out_ds = self.get_port(False, "Dataset")
        emitter.set(out_ds, (x, y))
        out_file.write("AbstractDataset does not have a codegen implementation\n")

    def assertions(self):
        out_ds = self.get_port(False, "Dataset").port_id
        output = Dataset(out_ds)

        return [
            output.cols == self.num_cols,
            output.rows == self.num_rows,
        ]
