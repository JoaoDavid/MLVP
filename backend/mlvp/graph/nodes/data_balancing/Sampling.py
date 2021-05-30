from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *


CONCATENATE = "{df} = pd.concat([{old_x},{old_y}], join = 'outer', axis = 1)\n"
SAMPLE = "{df} = {df}.sample(frac={frac}, replace={replace}, random_state={random_state})\n"
X = "{x} = {df}.drop({old_y}.name, axis=1)\n"
Y = "{y} = {df}[{old_y}.name]\n"


class Sampling(Node):

    def __init__(self, data):
        super().__init__(data)
        self.frac = data['frac']
        self.replace = data['replace']
        self.random_state = data['randomState']

    def import_dependency(self, packages):
        pass

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        df = "df" + str(curr_count)
        x = "x" + str(curr_count)
        y = "y" + str(curr_count)

        out_file.write(CONCATENATE.format(df=df, old_x=old_x, old_y=old_y))
        out_file.write(SAMPLE.format(df=df, frac=self.frac, replace=self.replace, random_state=self.random_state))
        out_file.write(X.format(x=x, df=df, old_y=old_y))
        out_file.write(Y.format(y=y, df=df, old_y=old_y))

        out_ds = self.get_port(False, "Sampled Dataset")
        emitter.set(out_ds, (x, y))

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Sampled Dataset")
        output_port.encoded_columns = input_port.encoded_columns
        output_port.columns = input_port.columns

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Sampled Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        return [
            output_ds.cols == input_ds.cols,
            output_ds.rows == ToInt(ToReal(input_ds.rows) * self.frac),
            output_ds.balanced == False,
            output_ds.time_series == False,
            output_ds.dataset == input_ds.dataset,
        ]
