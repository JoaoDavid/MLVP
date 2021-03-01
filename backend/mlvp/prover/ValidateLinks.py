from mlvp.prover.Assertions import *
from z3 import *


class ValidateLinks:

    def __init__(self, links_data):
        self.json_links_data = links_data
        self.solver = Solver()

    def validate(self):
        # print(str(self.json_links_data))
        for link_json in self.json_links_data:
            self.solver.add(link(link_json['sourcePortId'], link_json['targetPortId']))
            print(link_json)
            self.__parse_link(link_json['sourceNode'])
            self.__parse_link(link_json['targetNode'])
        return self.solver.check()

    def __parse_link(self, data):
        print(data)
        if data['type'] == 'NODE_IMPORT_CSV':
            id_output = self.__find_port(data['ports'], False, "Dataset")
            print(data['labels'])
            self.solver.add(import_from_csv(id_output, data['numCols'], data['numRows'], data['labels']))
        elif data['type'] == 'NODE_SPLIT_DATASET':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output_train = self.__find_port(data['ports'], False, "Train Dataset")
            id_output_test = self.__find_port(data['ports'], False, "Test Dataset")
            self.solver.add(split_dataset(id_input, id_output_train, id_output_test, data['testSize'],
                                                  data['trainSize'], data['shuffle'] == True, True))
        elif data['type'] == 'NODE_OVERSAMPLING':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Balanced Dataset")
            self.solver.add(oversampling(id_input, id_output, data['randomState']))
        elif data['type'] == 'NODE_UNDERSAMPLING':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Balanced Dataset")
            self.solver.add(undersampling(id_input, id_output, data['randomState']))
        elif data['type'] == 'NODE_PCA':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Reduced Dataset")
            self.solver.add(pca(id_input, id_output, data['randomState'], 2))
        elif data['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            self.solver.add(random_forest_classifier(id_input, data['numTrees'], data['maxDepth']))
        elif data['type'] == 'NODE_ACCURACY_CLASSIFIER':
            id_input_ds = self.__find_port(data['ports'], True, "Dataset")
            self.solver.add(evaluate_classifier(id_input_ds))
        elif data['type'] == 'NODE_CROSS_VALIDATION':
            id_input_ds = self.__find_port(data['ports'], True, "Dataset")
            self.solver.add(cross_validation(id_input_ds, data['numberFolds']))


    def __find_port(self, ports, is_in, name):
        for port in ports:
            if name == port['name'] and is_in == port['in']:
                return port['id']
