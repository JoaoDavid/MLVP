from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

ADD_FIRST_LAYER = "\t{clf}.add(Dense({output_size}, activation=\"{activation}\", input_dim={input_dim}))\n"
ADD_LAYER = "\t{clf}.add(Dense({output_size}, activation=\"{activation}\"))\n"
X_LEN = "len({x}.columns)"


class Dense(Node):

    def __init__(self, data):
        super().__init__(data)
        self.units = data['units']
        self.activation = data['activation']

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="keras.layers", class_to_import="Dense"))

    def codegen(self, emitter: Emitter, out_file):
        parent_port = self.parent_links[0].source_port
        clf, x = emitter.get(parent_port)

        if parent_port.num_layers == 0:
            out_file.write(ADD_FIRST_LAYER.format(clf=clf, output_size=self.units, activation=self.activation, input_dim=X_LEN.format(x=x)))
        else:
            out_file.write(ADD_LAYER.format(clf=clf, output_size=self.units, activation=self.activation))

        out_clf = self.get_port(False, "Output Layer")
        emitter.set(out_clf, (clf, x))

    def data_flow(self, node_columns):
        in_layer_port = self.get_port(True, "Layer")
        out_layer_port = self.get_port(False, "Output Layer")
        out_layer_port.num_layers = 1 if in_layer_port.num_layers == -1 else in_layer_port.num_layers + 1

    def assertions(self):
        in_layer_port = self.get_port(True, "Layer")
        out_layer_port = self.get_port(True, "Output Layer")

        return [
        ]
