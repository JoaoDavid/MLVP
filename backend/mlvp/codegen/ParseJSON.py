from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.datatype.dataset.Csv import Csv
from mlvp.datatype.model.RandomForest import RandomForest
from mlvp.statement import Port, ParentLink
from mlvp.statement import DatasetDeclarationStatement
from mlvp.statement import ModelAccuracyStatement
from mlvp.statement import RandomForestStatement
from mlvp.statement import SplitDatasetStatement
from mlvp.statement import OversamplingStatement, UnderSamplingStatement
from mlvp.statement import PCAStatement


class ParseJSON:

    def __init__(self, json_diagram):
        self.json_diagram = json_diagram
        self.json_links = {}
        self.json_nodes = {}
        # parsed information
        self.libraries = set()
        self.statements = {}
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
        return self.libraries, self.statements, self.roots

    def __parse_nodes(self):
        for node_id, data in self.json_nodes.items():
            if data['type'] == 'NODE_IMPORT_CSV':
                ds_type = Csv(file_name=data['fileName'], num_cols=data['numCols'], num_rows=data['numRows'],
                              target=data['columnNames'][-1])
                statement = DatasetDeclarationStatement(node_id=node_id, ds_type=ds_type)
                statement.ports = self.__parse_ports(data['ports'])
                self.statements[node_id] = statement
                self.libraries.add(IMPORT_AS.format(lib_name=PANDAS, lib_var=PANDAS_VAR))
                self.roots.append(statement)
            elif data['type'] == 'NODE_SPLIT_DATASET':
                statement = SplitDatasetStatement(node_id=node_id, test_size=data['testSize'],
                                                  train_size=data['testSize'], shuffle=data['shuffle'])
                statement.ports = self.__parse_ports(data['ports'])
                self.statements[node_id] = statement
                self.libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + MODEL_SELECTION, class_to_import=TRAIN_TEST_SPLIT))
            elif data['type'] == 'NODE_OVERSAMPLING':
                statement = OversamplingStatement(node_id=node_id, random_state=data['randomState'])
                statement.ports = self.__parse_ports(data['ports'])
                self.statements[node_id] = statement
                self.libraries.add(
                    FROM_IMPORT.format(package=IMBLEARN + "." + OVER_SAMPLING, class_to_import=RANDOM_OVERSAMPLER))
            elif data['type'] == 'NODE_UNDERSAMPLING':
                statement = UnderSamplingStatement(node_id=node_id, random_state=data['randomState'])
                statement.ports = self.__parse_ports(data['ports'])
                self.statements[node_id] = statement
                self.libraries.add(
                    FROM_IMPORT.format(package=IMBLEARN + "." + UNDER_SAMPLING, class_to_import=RANDOM_UNDERSAMPLER))
            elif data['type'] == 'NODE_PCA':
                statement = PCAStatement(node_id=node_id, random_state=data['randomState'])
                statement.ports = self.__parse_ports(data['ports'])
                self.statements[node_id] = statement
                self.libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + DECOMPOSITION, class_to_import=PCA))
            elif data['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
                model_type = RandomForest(num_trees=data['numTrees'], criterion=data['criterion'],
                                          max_depth=data['maxDepth'])
                statement = RandomForestStatement(node_id=node_id, model_type=model_type)
                statement.ports = self.__parse_ports(data['ports'])
                self.statements[node_id] = statement
                self.libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + ENSEMBLE, class_to_import=RANDOM_FOREST_CLF))
            elif data['type'] == 'NODE_ACCURACY_CLASSIFIER':
                statement = ModelAccuracyStatement(node_id=node_id)
                statement.ports = self.__parse_ports(data['ports'])
                self.statements[node_id] = statement
                self.libraries.add(FROM_IMPORT.format(package=SKLEARN + "." + METRICS, class_to_import=ACCURACY_SCORE))

    def __parse_links(self):
        for link_id, data in self.json_links.items():
            source_node = self.statements[data['source']]
            source_port = source_node.ports[data['sourcePort']]
            target_node = self.statements[data['target']]
            # add children and parents to the respective arrays
            source_node.children.append(target_node)
            target_node.parent_links.append(ParentLink(source_node, source_port))

    def __parse_ports(self, json_ports):
        ports = {}
        for p in json_ports:
            ports[p['id']] = Port(p['name'], bool(p['in']))
        return ports
