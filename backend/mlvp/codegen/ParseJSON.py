from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.ports import ParentLink
from mlvp.ports import DatasetPort, ModelPort
from mlvp.nodes import ImportFromCSV
from mlvp.nodes import ModelAccuracy
from mlvp.nodes import RandomForestClassifier
from mlvp.nodes import SplitDataset
from mlvp.nodes import Oversampling, UnderSampling
from mlvp.nodes import PCA
from mlvp.nodes import CrossValidation


class ParseJSON:

    def __init__(self, json_diagram):
        self.json_diagram = json_diagram
        self.json_links = {}
        self.json_nodes = {}
        # parsed information
        self.libraries = set()
        self.nodes = {}
        self.ports = {}
        self.roots = []

    def parse(self):
        for layer in self.json_diagram['layers']:
            if layer['type'] == 'diagram-links':
                self.json_links = layer['models']
            elif layer['type'] == 'diagram-nodes':
                self.json_nodes = layer['models']
        self.__parse_nodes()
        self.__parse_links()
        return self.libraries, self.roots

    def __parse_nodes(self):
        for node_id, data in self.json_nodes.items():
            if data['type'] == 'NODE_IMPORT_CSV':
                node = ImportFromCSV(node_id=node_id, file_name=data['fileName'],
                                                        num_cols=data['numCols'], num_rows=data['numRows'],
                                                        target=data['columnNames'][-1])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(IMPORT_AS.format(lib_name=PANDAS, lib_var=PANDAS_VAR))
                self.roots.append(node)
            elif data['type'] == 'NODE_SPLIT_DATASET':
                node = SplitDataset(node_id=node_id, test_size=data['testSize'],
                                                  train_size=data['trainSize'], shuffle=data['shuffle'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + MODEL_SELECTION, class_to_import=TRAIN_TEST_SPLIT))
            elif data['type'] == 'NODE_OVERSAMPLING':
                node = Oversampling(node_id=node_id, random_state=data['randomState'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(
                    FROM_IMPORT.format(package=IMBLEARN + "." + OVER_SAMPLING, class_to_import=RANDOM_OVERSAMPLER))
            elif data['type'] == 'NODE_UNDERSAMPLING':
                node = UnderSampling(node_id=node_id, random_state=data['randomState'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(
                    FROM_IMPORT.format(package=IMBLEARN + "." + UNDER_SAMPLING, class_to_import=RANDOM_UNDERSAMPLER))
            elif data['type'] == 'NODE_PCA':
                node = PCA(node_id=node_id, random_state=data['randomState'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + DECOMPOSITION, class_to_import=PCA))
            elif data['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
                node = RandomForestClassifier(node_id=node_id, num_trees=data['numTrees'],
                                                  criterion=data['criterion'], max_depth=data['maxDepth'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + ENSEMBLE, class_to_import=RANDOM_FOREST_CLF))
            elif data['type'] == 'NODE_ACCURACY_CLASSIFIER':
                node = ModelAccuracy(node_id=node_id)
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(FROM_IMPORT.format(package=SKLEARN + "." + METRICS, class_to_import=ACCURACY_SCORE))
            elif data['type'] == 'NODE_CROSS_VALIDATION':
                node = CrossValidation(node_id=node_id, number_folds=data['numberFolds'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.libraries.add(FROM_IMPORT.format(package=SKLEARN + "." + MODEL_SELECTION, class_to_import=CROSS_VAL_SCORE))

    def __parse_links(self):
        for link_id, data in self.json_links.items():
            source_node = self.nodes[data['source']]
            source_port = source_node.ports[data['sourcePort']]
            target_node = self.nodes[data['target']]
            target_port = target_node.ports[data['targetPort']]
            # add children and parents to the respective arrays
            source_node.children.append(target_node)
            target_node.parent_links.append(ParentLink(link_id, source_node, source_port, target_port))

    def __parse_ports(self, json_ports):
        ports = {}
        for p in json_ports:
            name = p['name']
            if "Dataset" in name:
                ports[p['id']] = DatasetPort(p['id'], p['name'], bool(p['in']))
            elif "Classifier" in name:
                ports[p['id']] = ModelPort(p['id'], p['name'], bool(p['in']))
        return ports
