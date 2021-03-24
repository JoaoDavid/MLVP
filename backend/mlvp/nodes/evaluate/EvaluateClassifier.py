from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset
from z3 import *


class EvaluateClassifier(Node):

    def __init__(self, node_id: str, title: str):
        super().__init__(node_id, title)

    def type_check(self):
        id_input_ds = self.get_port(True, "Dataset").port_id
        node_assertions = self.assertions(id_input_ds)
        return node_assertions

    def assertions(self, id_input_ds: str):
        input_ds = Dataset(id_input_ds)

        return [
            # requires
            input_ds.balanced,
            input_ds.cols >= 2
        ]
