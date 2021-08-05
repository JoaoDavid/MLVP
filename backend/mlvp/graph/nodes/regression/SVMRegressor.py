from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, continuous_last_column
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

INIT = "{reg} = SVR(kernel=\"{kernel}\", degree={degree}, gamma=\"{gamma}\")\n"
FIT = "{reg}.fit({x}, {y})\n"


class SVMRegressor(Node):

    def __init__(self, data):
        super().__init__(data)
        self.kernel = data['kernel']
        self.degree = data['degree']
        self.gamma = data['gamma']

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="sklearn.svm", class_to_import="SVR"))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        reg = "reg" + str(curr_count)
        x, y = emitter.get(parent_port)

        out_file.write(INIT.format(reg=reg, kernel=self.kernel, degree=self.degree, gamma=self.gamma))
        out_file.write(FIT.format(reg=reg, x=x, y=y))

        out_reg = self.get_port(False, "Regressor")
        emitter.set(out_reg, reg)

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        input_ds = Dataset(input_port.port_id)

        features_assertions = no_features_of_type(input_port, "string", input_ds.dataset)

        return [
            # requires
            input_ds.rows > 0,
            input_ds.cols > 1
        ] + features_assertions + continuous_last_column(input_port, input_ds.dataset)
