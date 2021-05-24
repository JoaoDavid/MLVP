from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, categorical_last_column
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.graph.nodes.neural_network import Compiler
from mlvp.typecheck import *
from mlvp.typecheck.TypeChecker import TypeChecker
from mlvp.typecheck.DataFlow import DataFlow
from mlvp.graph.TopologicalSorter import TopologicalSorter
from mlvp.graph.ParseJSON import ParseJSON

INIT = "{clf} = KerasClassifier(build_fn={build_fn}, epochs={epochs}, batch_size={batch_size}, verbose={verbose})\n"
FIT = "{clf}.fit({x}, {y})\n"

BUILD_FN = "def {build_fn}():\n"

class KerasClassifier(Node):

    def __init__(self, data):
        super().__init__(data)
        parser = ParseJSON(json_diagram=data['canvas'])
        roots, loose = parser.parse()
        topo_sorter = TopologicalSorter(roots, loose)
        self.sorted_nodes, self.sorted_loose_nodes = topo_sorter.topological_sort()
        data_flow = DataFlow(self.sorted_nodes, self.sorted_loose_nodes)
        data_flow.pass_data()

    def import_dependency(self, packages):
        for node in self.sorted_nodes:
            node.import_dependency(packages)
        packages.add(FROM_IMPORT.format(package="keras.wrappers.scikit_learn", class_to_import="KerasClassifier"))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        build_fn = "build_fn" + str(curr_count)
        clf = "clf" + str(curr_count)
        x, y = emitter.get(parent_port)
        out_file.write(BUILD_FN.format(build_fn=build_fn))

        for node in self.sorted_nodes:
            out_file.write('\t' * 1)
            node.codegen(emitter, out_file)

        out_file.write(INIT.format(clf=clf, build_fn=build_fn, epochs=10, batch_size=32, verbose=0))
        out_file.write(FIT.format(clf=clf, x=x, y=y))

        out_clf = self.get_port(False, "Classifier")
        emitter.set(out_clf, clf)

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        input_ds = Dataset(input_port.port_id)

        type_checker = TypeChecker(self.sorted_nodes, self.sorted_loose_nodes)
        tc_res = type_checker.verify(strong_type_check=True)
        z3_neural_network_well_built = Bool(NODE_PROP.format(name="neural network is well built", node_id=self.node_id))
        print(self.sorted_nodes)

        count = 0
        for node in self.sorted_nodes:
            if isinstance(node, Compiler):
                count += 1
        neural_network_well_built = len(self.sorted_nodes) > 0 and count == 1 and tc_res['canLink']
        features_assertions = no_features_of_type(input_port, "string", input_ds.dataset)

        return [
            # requires
            input_ds.balanced,
            input_ds.rows > 0,
            input_ds.cols > 1,
            z3_neural_network_well_built == neural_network_well_built,
            z3_neural_network_well_built,
        ] + features_assertions + categorical_last_column(input_port, input_ds.dataset)
