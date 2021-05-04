from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

# SAMPLER_INIT = "{var} = {sampler}(random_state={random_state})\n"
# FIT_RESAMPLE = "{x_res}, {y_res} = {var}.fit_resample({x}, {y})\n"
# TODO
LABEL_ENCODER = "LabelEncoder"


class LabelEncoding(Node):

    def __init__(self, data):
        super().__init__(data)
        self.encoded_column = data['encodedColumn']

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.preprocessing", class_to_import=LABEL_ENCODER)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        old_x, old_y = emitter.get(parent_port)

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Encoded Dataset")
        output_port.columns = input_port.columns

        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)


        return [
            # TODO
        ]
