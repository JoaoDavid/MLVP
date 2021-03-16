from mlvp.prover.Assertions import *
from z3 import *
import json
from mlvp.nodes import *
from mlvp.ports import *


def __assertions_to_str(assertions):
    res = []
    for assertion in assertions:
        res.append(str(assertion))
    return res


class Verification:

    def __init__(self, roots):
        self.solver = Solver()
        self.roots = roots
        self.node_assertions = {}
        self.link_assertions = {}
        self.all_assertions = []  # list of tuples of type: (node, node_assertions)

    def verify(self):
        result = {}
        if self.solver.check() == sat:
            result["canLink"] = True
        else:
            result["canLink"] = False

        result["nodeAssertions"] = self.node_assertions
        result["linkAssertions"] = self.link_assertions
        return json.dumps(result, indent=4)

    def __find_source_unsat(self, node: Node):
        print(node)
        if not node.visited:
            node.visited = True
            for parent_link in node.parent_links:
                self.__find_source_unsat(parent_link.parent_node)
            # parents are all visited
            self.__add_dataset_links(node.parent_links)
            if isinstance(node, AbstractDataset):
                out_ds = node.get_port(False, "Dataset").port_id
                node_assertions = abstract_ds(out_ds, node.num_cols, node.num_rows)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, ImportFromCSV):
                out_ds = node.get_port(False, "Dataset").port_id
                node_assertions = import_from_csv(out_ds, node.num_cols, node.num_rows, node.labels)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, SplitDataset):
                id_input = node.get_port(True, "Dataset").port_id
                id_output_train = node.get_port(False, "Train Dataset").port_id
                id_output_test = node.get_port(False, "Test Dataset").port_id
                node_assertions = split_dataset(id_input, id_output_train, id_output_test, node.test_size,
                                                node.train_size, node.shuffle, True)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, Oversampling):
                id_input = node.get_port(True, "Dataset").port_id
                id_output = node.get_port(False, "Balanced Dataset").port_id
                node_assertions = oversampling(id_input, id_output, node.random_state)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, UnderSampling):
                id_input = node.get_port(True, "Dataset").port_id
                id_output = node.get_port(False, "Balanced Dataset").port_id
                node_assertions = undersampling(id_input, id_output, node.random_state)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, PCA):
                id_input = node.get_port(True, "Dataset").port_id
                id_output = node.get_port(False, "Reduced Dataset").port_id
                node_assertions = pca(id_input, id_output, node.random_state, 2)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, RandomForestClassifier):
                id_input = node.get_port(True, "Dataset").port_id
                max_depth = -1 if node.max_depth == "None" else node.max_depth
                node_assertions = random_forest_classifier(id_input, node.num_trees, max_depth)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, ModelAccuracy):
                id_input_ds = node.get_port(True, "Dataset").port_id
                node_assertions = evaluate_classifier(id_input_ds)
                self.__add_node_assertions(node, node_assertions)

            elif isinstance(node, CrossValidation):
                id_input_ds = node.get_port(True, "Dataset").port_id
                node_assertions = cross_validation(id_input_ds, node.number_folds)
                self.__add_node_assertions(node, node_assertions)

            for child in node.children:
                self.__find_source_unsat(child)

    def __add_dataset_links(self, parent_links):
        for parent_link in parent_links:
            if isinstance(parent_link.source_port, DatasetPort):
                link_assertions = link(parent_link.source_port.port_id, parent_link.target_port.port_id)
                self.link_assertions[parent_link.link_id] = self.__assertions_to_str(link_assertions)
                self.solver.add(link_assertions)

    def __add_node_assertions(self, node: Node, node_assertions):
        self.all_assertions.append((node, node_assertions))
        self.solver.add(node_assertions)
        if self.solver.check() == sat:
            print("sat")
        else:
            print("unsat")
