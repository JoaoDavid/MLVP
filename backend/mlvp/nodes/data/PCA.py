from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset, SEP
from z3 import *


class PCA(Node):

    def __init__(self, node_id: str, title: str, random_state, num_components):
        super().__init__(node_id, title)
        self.random_state = random_state
        self.num_components = num_components

    def type_check(self):
        id_input = self.get_port(True, "Dataset").port_id
        id_output = self.get_port(False, "Reduced Dataset").port_id
        node_assertions = self.assertions(id_input, id_output)
        return node_assertions

    def assertions(self, id_input, id_output):
        input_ds = Dataset(id_input)
        output_ds = Dataset(id_output)
        z3_n_components = Int("node" + SEP + "n-components")

        return [
            # requires
            z3_n_components == self.num_components,
            z3_n_components < input_ds.cols,
            z3_n_components > 0,
            # ensures
            output_ds.cols == z3_n_components + 1,
            output_ds.rows == input_ds.rows,
            output_ds.n_labels == input_ds.n_labels,
            output_ds.max_label_count == input_ds.max_label_count,
            output_ds.min_label_count == input_ds.min_label_count,
            input_ds.balanced == output_ds.balanced,
        ]
