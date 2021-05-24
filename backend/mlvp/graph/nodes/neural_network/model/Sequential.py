from mlvp.codegen import *
from mlvp.graph.nodes.Node import *

INIT = "{clf} = Sequential()\n"


class Sequential(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="keras.models", class_to_import="Sequential"))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        clf = "clf" + str(curr_count)

        out_file.write(INIT.format(clf=clf))

        out_clf = self.get_port(False, "Layer")
        emitter.set(out_clf, clf)

    def data_flow(self, node_columns):
        pass

    def assertions(self):

        return [
        ]
