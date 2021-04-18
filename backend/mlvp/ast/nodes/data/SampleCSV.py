from mlvp.codegen import *
from mlvp.ast.nodes.Node import *
from mlvp.typecheck import *

LOAD_CSV = "{df} = {pandas_var}.read_csv(\'./{file_name}\')\n"
X = "{x} = {df}.drop(\'{target}\', axis=1)\n"
Y = "{y} = {df}[\'{target}\']\n"
ASSERT = "assert({arg1} == len({arg2}))\n"
PANDAS_VAR = "pd"


class SampleCSV(Node):

    def __init__(self, data):
        super().__init__(data)
        self.file_name = data['fileName']
        self.num_cols = data['numCols']
        self.num_rows = data['numRows']
        self.columns = data['columns']
        self.target = None if data['targetIndex'] == -1 else self.columns[data['targetIndex']]['name']
        self.labels = data['labels']
        self.time_series = data['timeSeries']

    def import_dependency(self):
        return IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        out_ds = self.get_port(False, "Dataset")
        emitter.set(out_ds, (x, y))
        out_file.write(LOAD_CSV.format(df=df, pandas_var=PANDAS_VAR, file_name=self.file_name))
        out_file.write(ASSERT.format(arg1=self.num_rows, arg2=df))
        out_file.write(ASSERT.format(arg1=self.num_cols, arg2=df+".columns"))
        out_file.write(X.format(x=x, df=df, target=self.target))
        out_file.write(Y.format(y=y, df=df, target=self.target))

    def assertions(self):
        output_port = self.get_port(False, "Dataset")
        output = Dataset(output_port.port_id)

        # set the columns dict for the output port
        for col in self.columns:
            output_port.columns[col['name']] = col['type']

        z3_unique_col_names = Bool(NODE_PROP.format(name="unique_col_names", node_id=self.node_id))
        unique_col_names = len(self.columns) == len(output_port.columns)

        col_assertions = []
        column_names = [String(col['name']) for col in self.columns]
        column_types = [get_col_type(col['type']) for col in self.columns]

        for i in range(len(self.columns)):
            col_assertions.append(column(output.dataset, column_names[i]) == column_types[i])

        label_names = [Int(output_port.port_id + SEP + "label_" + key) for key in self.labels.keys()]
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
                   # TODO
                   # output.rows == self.num_rows,
                   # output.rows == sum(label_counts),
                   output.time_series == self.time_series,
                   # And(labels_values),
                   output.balanced == is_balanced,
                   # output.balanced == And(list_balanced),
                   output.n_labels == len(label_counts),
                   z3_unique_col_names == unique_col_names,
                   z3_unique_col_names,
               ] + label_counts_assertions + labels_values + col_assertions
