from mlvp.prover.Assertions import *
from z3 import *
import json

class ValidateLinks:

    def __init__(self, links_data):
        self.json_links = links_data["links"]
        self.json_nodes = links_data["nodes"]
        self.assertions = []
        self.solver = Solver()

    def validate(self):
        print("Number of links: " + str(len(self.json_links)))
        for node_json in self.json_nodes:
            self.__parse_node(node_json)
        for link_json in self.json_links:
            self.assertions.append(link(link_json['sourcePortId'], link_json['targetPortId']))


        self.solver.add(self.assertions)
        result = {}
        if self.solver.check() == sat:
            result["canLink"] = True
            # print(str(self.solver.assertions()))
        else:
            self.solver.reset()
            result["canLink"] = False
            index_error = self.__binary_search_for_unsat(self.assertions, 0, len(self.assertions)-1)
            result["error"] = str(index_error)
            # result["error"] = str(self.assertions[index_error])
            # print(str(self.solver.assertions()))
        return json.dumps(result, indent=4)

    def __parse_node(self, data):
        if data['type'] == 'NODE_ABSTRACT_DS':
            id_output = self.__find_port(data['ports'], False, "Dataset")
            self.assertions.append(abstract_ds(id_output, data['numCols'], data['numRows']))
        elif data['type'] == 'NODE_IMPORT_CSV':
            id_output = self.__find_port(data['ports'], False, "Dataset")
            print(data['labels'])
            self.assertions.append(import_from_csv(id_output, data['numCols'], data['numRows'], data['labels']))
        elif data['type'] == 'NODE_SPLIT_DATASET':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output_train = self.__find_port(data['ports'], False, "Train Dataset")
            id_output_test = self.__find_port(data['ports'], False, "Test Dataset")
            self.assertions.append(split_dataset(id_input, id_output_train, id_output_test, data['testSize'],
                                                  data['trainSize'], data['shuffle'] == True, True))
        elif data['type'] == 'NODE_OVERSAMPLING':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Balanced Dataset")
            self.assertions.append(oversampling(id_input, id_output, data['randomState']))
        elif data['type'] == 'NODE_UNDERSAMPLING':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Balanced Dataset")
            self.assertions.append(undersampling(id_input, id_output, data['randomState']))
        elif data['type'] == 'NODE_PCA':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Reduced Dataset")
            self.assertions.append(pca(id_input, id_output, data['randomState'], 2))
        elif data['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            maxDepth = -1 if data['maxDepth'] == "None" else data['maxDepth']
            self.assertions.append(random_forest_classifier(id_input, data['numTrees'], maxDepth))
        elif data['type'] == 'NODE_ACCURACY_CLASSIFIER':
            id_input_ds = self.__find_port(data['ports'], True, "Dataset")
            self.assertions.append(evaluate_classifier(id_input_ds))
        elif data['type'] == 'NODE_CROSS_VALIDATION':
            id_input_ds = self.__find_port(data['ports'], True, "Dataset")
            self.assertions.append(cross_validation(id_input_ds, data['numberFolds']))


    def __find_port(self, ports, is_in, name):
        for port in ports:
            if name == port['name'] and is_in == port['in']:
                return port['id']

    def __binary_search_for_unsat(self, array, l, r):
        print(str(len(array)) + " " + str(l) + " " + str(r))
        # Check base case
        if r > l and len(array) > 1:

            mid = l + (r - l) // 2
            print("mid " + str(mid))
            # If element is present at the middle itself
            self.solver.push()
            self.solver.add(array[:mid])
            if self.solver.check() == sat:
                return self.__binary_search_for_unsat(array[mid:], mid, r)
            else:
                self.solver.pop()
                return self.__binary_search_for_unsat(array[:mid], l, mid - 1)
        else:
            # Element is not present in the array
            print(str(array[2]))
            print(self.solver.check())
            print(len(array))
            print(self.solver.add(array[:3]))
            print(self.solver.check())

            return array[r]
