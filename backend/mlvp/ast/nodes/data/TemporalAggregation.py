from mlvp.codegen import *
from mlvp.ast.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
ROLLING = "{df}[\'{new_col}\'] = {df}[\'{original_col}\'].rolling({window_size}, min_periods=1).{metric}()\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"
PANDAS_VAR = "pd"

NONEXISTENT_COLUMN = "column \"{column_name}\" does not exist on the dataset"
DUPLICATE_COLUMN = "column \"{column_name}\" is already part of the dataset"


class TemporalAggregation(Node):

    def __init__(self, data):
        super().__init__(data)
        self.new_col_name = data['newColumnName']
        self.original_col_name = data['originalColumnName']
        self.metric = data['metric']
        self.window_size = data['windowSize']

    def import_dependency(self):
        return IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)

        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        out_file.write(ROLLING.format(df=df, new_col=self.new_col_name, original_col=self.original_col_name,
                                      window_size=str(self.window_size), metric=self.metric))
        out_file.write(X.format(x=x, df=df, old_y=old_y))
        out_file.write(Y.format(y=y, df=df, old_y=old_y))

        out_ds = self.get_port(False, "Engineered Dataset")
        emitter.set(out_ds, (x, y))

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Engineered Dataset")
        output_port.columns = input_port.columns

        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        z3_len_new_col = Int(NODE_PROP.format(name="len_new_column_name", node_id=self.node_id))
        z3_len_org_col = Int(NODE_PROP.format(name="len_original_column_name", node_id=self.node_id))
        z3_duplicate_column = Bool(DUPLICATE_COLUMN.format(column_name=self.new_col_name))
        z3_nonexistent_column = Bool(NONEXISTENT_COLUMN.format(column_name=self.original_col_name))
        duplicate_column = True
        nonexistent_column = True

        if len(input_port.columns) > 0:
            duplicate_column = self.new_col_name not in input_port.columns
            nonexistent_column = self.original_col_name in input_port.columns

        output_port.columns[self.new_col_name] = "float"

        return [
            # requires
            input_ds.time_series,
            z3_len_new_col == len(self.new_col_name),
            z3_len_new_col > 0,
            z3_len_org_col == len(self.original_col_name),
            z3_len_org_col > 0,
            z3_duplicate_column == duplicate_column,
            z3_duplicate_column,
            z3_nonexistent_column == nonexistent_column,
            z3_nonexistent_column,
            Or(
                column(input_ds.dataset, String(self.original_col_name)) == get_col_type("int"),
                column(input_ds.dataset, String(self.original_col_name)) == get_col_type("float")),

            input_ds.time_series == output_ds.time_series,
        ]
