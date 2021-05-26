from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

ADD_LAYER = "\t{clf}.add(Dense({output_size}, activation={activation}, input_dim={input_dim}))\n"


class Dense(Node):

    def __init__(self, data):
        super().__init__(data)
        self.units = data['units']
        self.activation = data['activation']

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="keras.layers", class_to_import="Dense"))

    def codegen(self, emitter: Emitter, out_file):
        parent_port = self.parent_links[0].source_port
        clf = emitter.get(parent_port)

        out_file.write(ADD_LAYER.format(clf=clf, output_size=self.units, activation=self.activation, input_dim=3))

        out_clf = self.get_port(False, "Output Layer")
        emitter.set(out_clf, clf)

    def data_flow(self, node_columns):
        in_layer_port = self.get_port(True, "Layer")
        out_layer_port = self.get_port(False, "Output Layer")
        out_layer_port.num_layers = in_layer_port.num_layers + 1

    def assertions(self):
        in_layer_port = self.get_port(True, "Layer")
        out_layer_port = self.get_port(True, "Output Layer")
        z3_in_layers = Int(PORT_PROP.format(id_port=in_layer_port.port_id, name="n_layers"))

        return [
        ]
