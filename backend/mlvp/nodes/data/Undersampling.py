from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset
from z3 import *


class UnderSampling(Node):

    def __init__(self, node_id: str, title: str, random_state):
        super().__init__(node_id, title)
        self.random_state = random_state

    def type_check(self):
        id_input = self.get_port(True, "Dataset").port_id
        id_output = self.get_port(False, "Balanced Dataset").port_id
        node_assertions = self.assertions(id_input, id_output)
        return node_assertions

    def assertions(self, id_input, id_output):
        input_ds = Dataset(id_input)
        output_ds = Dataset(id_output)

        return [
            input_ds.cols == output_ds.cols,
            Implies(input_ds.balanced, And(
                input_ds.rows == output_ds.rows,
                input_ds.n_labels == output_ds.n_labels,
                input_ds.max_label_count == output_ds.max_label_count,
                input_ds.min_label_count == output_ds.min_label_count
            )),
            Implies(Not(input_ds.balanced), And(
                output_ds.rows == input_ds.min_label_count * input_ds.n_labels,
                input_ds.n_labels == output_ds.n_labels,
                output_ds.max_label_count == input_ds.min_label_count,
                input_ds.min_label_count == output_ds.min_label_count,
            )),
            output_ds.balanced
        ]
