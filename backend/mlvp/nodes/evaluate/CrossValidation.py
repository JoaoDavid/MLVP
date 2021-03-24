from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset, SEP
from z3 import *


class CrossValidation(Node):

    def __init__(self, node_id: str, title: str, num_folds: int):
        super().__init__(node_id, title)
        self.num_folds = num_folds

    def type_check(self):
        id_input_ds = self.get_port(True, "Dataset").port_id
        node_assertions = self.assertions(id_input_ds)
        return node_assertions

    def assertions(self, id_input_ds):
        input_ds = Dataset(id_input_ds)

        z3_n_folds = Int("node" + SEP + "n-folds")

        return [
            # requires
            z3_n_folds == self.num_folds,
            z3_n_folds > 1,
            input_ds.balanced,
            input_ds.cols > 1
        ]
