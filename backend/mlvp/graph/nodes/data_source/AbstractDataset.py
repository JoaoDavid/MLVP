from mlvp.graph.nodes.Node import *
from mlvp.codegen import *
from mlvp.typecheck import *

PROMPT_FILE_PATH = "{fp} = input(\'Path to the csv with cols={num_cols} rows={num_rows}: \\n\')\n"
LOAD_CSV = "{df} = {pandas_var}.read_csv({fp})\n"
X = "{x} = {df}.drop({df}.columns[-1], axis=1)\n"
Y = "{y} = {df}[{df}.columns[-1]]\n"
ASSERT = "assert({arg1} == len({arg2}))\n"
PANDAS_VAR = "pd"


class AbstractDataset(Node):

    def __init__(self, data):
        super().__init__(data)
        self.num_cols = data['numCols']
        self.num_rows = data['numRows']
        self.columns = [] #TODO, implement column creation on the frontend
        self.time_series = data['timeSeries']

    def import_dependency(self, packages):
        packages.add(IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)
        fp = "fp" + str(curr_count)
        out_ds = self.get_port(False, "Dataset")
        emitter.set(out_ds, (x, y))
        out_file.write(PROMPT_FILE_PATH.format(fp=fp, num_cols=self.num_cols, num_rows=self.num_rows))
        out_file.write(LOAD_CSV.format(df=df, pandas_var=PANDAS_VAR, fp=fp))
        out_file.write(ASSERT.format(arg1=self.num_rows, arg2=df))
        out_file.write(ASSERT.format(arg1=self.num_cols, arg2=df+".columns"))
        out_file.write(X.format(x=x, df=df))
        out_file.write(Y.format(y=y, df=df))

    def data_flow(self, node_columns):
        output_port = self.get_port(False, "Dataset")

        # set the columns dict for the output port
        for col in self.columns:
            output_port.columns[col['name']] = col['type']

    def assertions(self):
        output_port = self.get_port(False, "Dataset")
        output = Dataset(output_port.port_id)

        z3_unique_col_names = Bool(NODE_PROP.format(name="unique_col_names", node_id=self.node_id))
        unique_col_names = len(self.columns) == len(output_port.columns)

        col_assertions = []
        column_names = [String(col['name']) for col in self.columns]
        column_types = [get_col_type(col['type']) for col in self.columns]

        for i in range(len(self.columns)):
            col_assertions.append(column(output.dataset, column_names[i]) == column_types[i])

        return [
            output.cols == self.num_cols,
            output.rows == self.num_rows,
            output.time_series == self.time_series,
            output.reduced == False,
            output.processed == False,
            z3_unique_col_names == unique_col_names,
            z3_unique_col_names,
        ]
