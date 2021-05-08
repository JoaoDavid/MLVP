from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

# SAMPLER_INIT = "{var} = {sampler}(random_state={random_state})\n"
# FIT_RESAMPLE = "{x_res}, {y_res} = {var}.fit_resample({x}, {y})\n"
# TODO
# RANDOM_OVERSAMPLER = "RandomOverSampler"


class OneHotDecoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.encoded_column = data['encodedColumn']
        # TODO

    def import_dependency(self):
        # TODO
        return FROM_IMPORT.format(package="numpy", class_to_import="np")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)
        dummies = emitter.get(self.encoded_column)
        # TODO

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Decoded Dataset")
        output_port.columns = input_port.columns
        # TODO

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Decoded Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)
        self.data_flow(node_columns)

        # TODO

        return [
            # TODO
        ]
