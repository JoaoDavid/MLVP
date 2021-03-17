from mlvp.nodes.Node import Node


class ImportFromCSV(Node):

    def __init__(self, node_id: str, file_name: str, num_cols: int, num_rows: int, target: str, labels):
        super().__init__(node_id)
        self.file_name = file_name
        self.num_cols = num_cols
        self.num_rows = num_rows
        self.target = target
        self.labels = labels
