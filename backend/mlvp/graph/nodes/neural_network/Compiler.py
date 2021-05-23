from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, categorical_last_column
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

INIT = "{clf} = RandomForestClassifier()\n"
FIT = "{clf}.fit({x}, {y})\n"


class Compiler(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.", class_to_import="RANDOM_OVERSAMPLER")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        clf = "clf" + str(curr_count)
        x, y = emitter.get(parent_port)

        out_file.write(INIT.format(clf=clf))
        out_file.write(FIT.format(clf=clf, x=x, y=y))

        out_clf = self.get_port(False, "Classifier")
        emitter.set(out_clf, clf)

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        layer_port = self.get_port(True, "Layer")
        optimizer_port = self.get_port(True, "Optimizer")
        z3_in_layers = Int(PORT_PROP.format(id_port=layer_port.port_id, name="n_layers"))


        for parent_link in self.parent_links:
            print(parent_link.target_port == layer_port)

        layer_assertions = []
        if self.all_input_ports_linked():
            layer_assertions = [
                z3_in_layers == layer_port.num_layers,
                z3_in_layers > 0,
            ]

        return [
            # requires
        ] + layer_assertions
