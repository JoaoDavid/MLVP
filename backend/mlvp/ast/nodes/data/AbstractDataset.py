from mlvp.ast.nodes.Node import Node
from mlvp.typecheck import *


class AbstractDataset(Node):

    def __init__(self, data):
        super().__init__(data)
        self.num_cols = data['numCols']
        self.num_rows = data['numRows']

    def assertions(self):
        out_ds = self.get_port(False, "Dataset").port_id
        output = Dataset(out_ds)

        return [
            output.cols == self.num_cols,
            output.rows == self.num_rows,
        ]
