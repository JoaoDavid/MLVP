from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset


class AbstractDataset(Node):

    def __init__(self, node_id: str, title: str, num_cols: int, num_rows: int):
        super().__init__(node_id, title)
        self.num_cols = num_cols
        self.num_rows = num_rows

    def assertions(self):
        out_ds = self.get_port(False, "Dataset").port_id
        output = Dataset(out_ds)

        return [
            output.cols == self.num_cols,
            output.rows == self.num_rows,
        ]
