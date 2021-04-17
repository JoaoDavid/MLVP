from mlvp.codegen import *
from mlvp.ast.nodes.Node import *
from mlvp.typecheck import *

ROLLING = "df[\'{new_col}\'] = df[\'{original_col}\'].rolling({window_size}, min_periods=1).{metric}()\n"
PANDAS_VAR = "pd"


class TemporalAggregation(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self):
        return IMPORT_AS.format(lib_name="pandas", lib_var=PANDAS_VAR)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        df = "df" + str(curr_count)

        # out_file.write(ROLLING.format(df=df, x=x, y=y))

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Engineered Dataset")
        output_port.columns = input_port.columns

        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        return [
            # requires
            input_ds.time_series,
        ]
