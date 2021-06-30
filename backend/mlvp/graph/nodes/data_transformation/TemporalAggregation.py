from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
ROLLING = "{df}[\'{new_col}\'] = {df}[\'{original_col}\'].rolling({window_size}, min_periods=1).{metric}()\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"
PANDAS_VAR = "pd"

NONEXISTENT_COLUMN = "column \"{column_name}\" exists on the dataset"
DUPLICATE_COLUMN = "column \"{column_name}\" is unique on the dataset"


class TemporalAggregation(Node):

    def __init__(self, data):
        super().__init__(data)
        self.new_col_name = data['newColumnName']
        self.original_col_name = data['originalColumnName']
        self.metric = data['metric']
        self.window_size = data['windowSize']

    def import_dependency(self, packages):
        packages.add(IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR))

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

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Engineered Dataset")
        output_port.encoded_columns = input_port.encoded_columns

        this_node_columns = {}
        i = 0
        for col_name, col_type in input_port.columns.items():
            if i == len(input_port.columns) - 1:
                output_port.columns[self.new_col_name] = "float"
            output_port.columns[col_name] = col_type
            i += 1
            if col_type == "int" or col_type == "float":
                this_node_columns[col_name] = col_type
        node_columns[self.node_id] = this_node_columns

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Engineered Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        z3_len_new_col = Int(NODE_PROP.format(name="len_new_column_name", node_id=self.node_id))
        z3_duplicate_column = Bool(DUPLICATE_COLUMN.format(column_name=self.new_col_name))
        z3_nonexistent_column = Bool(NONEXISTENT_COLUMN.format(column_name=self.original_col_name))

        assert_existent_column = []
        if len(input_port.columns) > 0:
            duplicate_column = self.new_col_name not in input_port.columns
            nonexistent_column = self.original_col_name in input_port.columns
            assert_existent_column = [
                z3_nonexistent_column == nonexistent_column,
                z3_nonexistent_column,
                z3_duplicate_column == duplicate_column,
                z3_duplicate_column,
                Or(
                    column(input_ds.dataset, String(self.original_col_name)) == get_col_type("int"),
                    column(input_ds.dataset, String(self.original_col_name)) == get_col_type("float")
                ),
                column(output_ds.dataset, String(self.new_col_name)) == get_col_type("float")
            ]

        return [
            # requires
            input_ds.time_series,
                   z3_len_new_col == len(self.new_col_name),
                   z3_len_new_col > 0,
                   input_ds.time_series == output_ds.time_series,
                   output_ds.reduced == input_ds.reduced,
                   output_ds.processed == True,
        ] + assert_existent_column
