from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

# SAMPLER_INIT = "{var} = {sampler}(random_state={random_state})\n"
# FIT_RESAMPLE = "{x_res}, {y_res} = {var}.fit_resample({x}, {y})\n"
# TODO
# RANDOM_OVERSAMPLER = "RandomOverSampler"


class TemplateCodeName(Node):

    def __init__(self, data):
        super().__init__(data)
        # TODO

    def import_dependency(self):
        # TODO
        return FROM_IMPORT.format(package="imblearn.over_sampling", class_to_import="RANDOM_OVERSAMPLER")

    def codegen(self, emitter: Emitter, out_file):
        print("")
        # TODO

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Balanced Dataset")
        output_port.columns = input_port.columns

        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        # TODO

        return [
            # TODO
        ]
