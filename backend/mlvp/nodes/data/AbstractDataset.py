from mlvp.nodes.Node import Node


class AbstractDataset(Node):

    def __init__(self, node_id: str, num_cols: int, num_rows: int):
        super().__init__(node_id)
        self.num_cols = num_cols
        self.num_rows = num_rows
