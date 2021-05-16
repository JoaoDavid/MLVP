from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, categorical_last_column
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

INIT = "{reg} = LinearRegression(fit_intercept={fit_intercept}, normalize={normalize}, copy_X={copy_x}, n_jobs={num_jobs}, positive={positive})\n"
FIT = "{reg}.fit({x}, {y})\n"


class LinearRegression(Node):

    def __init__(self, data):
        super().__init__(data)
        self.fit_intercept = data['fitIntercept']
        self.normalize = data['normalize']
        self.copy_x = data['copyX']
        self.num_jobs = data['numJobs']
        self.positive = data['positive']

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.linear_model", class_to_import="LinearRegression")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        reg = "reg" + str(curr_count)
        x, y = emitter.get(parent_port)

        out_file.write(
            INIT.format(reg=reg, fit_intercept=self.fit_intercept, normalize=self.normalize, copy_x=self.copy_x,
                        num_jobs=self.num_jobs, positive=self.positive))
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
               ] + features_assertions + categorical_last_column(input_port, input_ds.dataset)
