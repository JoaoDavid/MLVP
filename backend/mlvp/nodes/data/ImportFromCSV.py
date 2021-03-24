from typing import Dict
from z3 import *

from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.templates.CodeTemplate import LOAD_CSV, FEATURES, TARGET
from mlvp.codegen.templates.LibNames import PANDAS_VAR
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

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        df_var = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        out_ds = self.get_port(False, "Dataset")
        emitter.set(out_ds, (x, y))
        out_file.write(LOAD_CSV.format(var=df_var, pandas_var=PANDAS_VAR, file_name=self.file_name))
        out_file.write(FEATURES.format(x=x, var=df_var, target=self.target))
        out_file.write(TARGET.format(y=y, var=df_var, target=self.target))

    def type_check(self):
        out_ds = self.get_port(False, "Dataset").port_id
        node_assertions = self.assertions(out_ds)

        return node_assertions

    def assertions(self, id_output: str):
        output = Dataset(id_output)

        label_names = [Int(id_output + SEP + "label-" + key) for key in self.labels.keys()]
        label_counts = list(self.labels.values())
        labels_values = [label_names[i] == (label_counts[i]) for i in range(len(self.labels))]

        list_balanced = [IntVal(label_counts[i]) == IntVal(label_counts[i + 1]) for i in range(len(self.labels) - 1)]
        # list_balanced = [abs(label_counts[i] - label_counts[i + 1]) <= 1 for i in range(len(self.labels) - 1)]

        label_counts_assertions = []
        if len(self.labels) > 0:
            label_counts_assertions = [
                output.max_label_count == max(label_counts),
                output.min_label_count == min(label_counts)
            ]

        print(And(list_balanced).num_args())
        is_balanced = all(list_balanced)

        return [
            output.cols == self.num_cols,
            output.rows == self.num_rows,
            output.rows == sum(label_counts),
            # And(labels_values),
            output.balanced == is_balanced,
            # output.balanced == And(list_balanced),
            output.n_labels == len(label_counts),
        ] + label_counts_assertions + labels_values
