from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, categorical_last_column
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

INIT = "{clf} = RandomForestClassifier()\n"
FIT = "{clf}.fit({x}, {y})\n"


class StochasticGradientDescent(Node):

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
        input_port = self.get_port(True, "Dataset")

        return [
            # requires
        ]
