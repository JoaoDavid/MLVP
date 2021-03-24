from typing import Dict
from z3 import *
from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset, SEP


class ImportFromCSV(Node):

    def __init__(self, node_id: str, title: str, file_name: str, num_cols: int, num_rows: int, target: str, labels):
        super().__init__(node_id, title)
        self.file_name = file_name
        self.num_cols = num_cols
        self.num_rows = num_rows
        self.target = target
        self.labels = labels

    def type_check(self):
        out_ds = self.get_port(False, "Dataset").port_id
        node_assertions = self.assertions(out_ds, self.num_cols, self.num_rows, self.labels)

        return node_assertions

    def assertions(self, id_output: str, n_cols: int, n_rows: int, labels: Dict[str, int]):
        output = Dataset(id_output)

        label_names = [Int(id_output + SEP + "label-" + key) for key in labels.keys()]
        label_counts = list(labels.values())
        labels_values = [label_names[i] == (label_counts[i]) for i in range(len(labels))]

        list_balanced = [IntVal(label_counts[i]) == IntVal(label_counts[i + 1]) for i in range(len(labels) - 1)]
        # list_balanced = [abs(label_counts[i] - label_counts[i + 1]) <= 1 for i in range(len(labels) - 1)]

        label_counts_assertions = []
        if len(labels) > 0:
            label_counts_assertions = [
                output.max_label_count == max(label_counts),
                output.min_label_count == min(label_counts)
            ]

        print(And(list_balanced).num_args())
        is_balanced = all(list_balanced)
        return [
                   output.cols == n_cols,
                   output.rows == n_rows,
                   output.rows == sum(label_counts),
                   # And(labels_values),
                   output.balanced == is_balanced,
                   # output.balanced == And(list_balanced),
                   output.n_labels == len(label_counts),
               ] + label_counts_assertions + labels_values
