from mlvp.nodes.Node import Node


class CrossValidation(Node):

    def __init__(self, node_id: str, title: str, number_folds: int):
        super().__init__(node_id, title)
        self.number_folds = number_folds
