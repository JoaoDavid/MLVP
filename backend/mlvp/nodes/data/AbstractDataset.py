from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset


class AbstractDataset(Node):

    def __init__(self, node_id: str, title: str, num_cols: int, num_rows: int):
        super().__init__(node_id, title)
        self.num_cols = num_cols
        self.num_rows = num_rows

    def type_check(self):
        out_ds = self.get_port(False, "Dataset").port_id
        node_assertions = self.assertions(out_ds)
        return node_assertions

    def assertions(self, id_output: str):
        output = Dataset(id_output)

        return [
            output.cols == self.num_cols,
            output.rows == self.num_rows,
        ]
