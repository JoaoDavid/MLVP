from mlvp.codegen import *
from mlvp.ast.nodes.Node import Node
from mlvp.typecheck import *

LOAD_CSV = "{var} = {pandas_var}.read_csv(\'./{file_name}\')\n"
FEATURES = "{x} = {var}.drop(\'{target}\', axis=1)\n"
TARGET = "{y} = {var}[\'{target}\']\n"

PANDAS_VAR = "pd"


class ImportFromCSV(Node):

    def __init__(self, data):
        super().__init__(data)
        self.file_name = data['fileName']
        self.num_cols = data['numCols']
        self.num_rows = data['numRows']
        self.target = None if len(data['columnNames']) == 0 else data['columnNames'][-1]
        self.labels = data['labels']

    def import_dependency(self):
        return IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR)

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

    def assertions(self):
        out_ds = self.get_port(False, "Dataset").port_id
        output = Dataset(out_ds)

        label_names = [Int(out_ds + SEP + "label-" + key) for key in self.labels.keys()]
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