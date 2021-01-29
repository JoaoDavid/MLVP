from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.datatype.dataset.Csv import Csv
from mlvp.datatype.model.RandomForest import RandomForest
from mlvp.statement import DatasetDeclarationStatement
from mlvp.statement import ModelAccuracyStatement
from mlvp.statement import RandomForestStatement
from mlvp.statement import SplitDatasetStatement
from mlvp.statement import Port, ParentLink


class ParseJSON:

    def __init__(self, json_diagram):
        self.json_diagram = json_diagram
        self.json_links = {}
        self.json_nodes = {}
        # parsed information
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

        for node in self.roots:
            print(node.children[0].children)

    def __parse_nodes(self):
        libraries = set()
        for node_id, data in self.json_nodes.items():
            if data['type'] == 'NODE_IMPORT_CSV':
                ds_type = Csv(file_name=data['fileName'], num_cols=data['numCols'], num_rows=data['numRows'],
                              target=data['columnNames'][-1])
                statement = DatasetDeclarationStatement(node_id=node_id, ds_type=ds_type)
                self.statements[node_id] = statement
                libraries.add(IMPORT_AS.format(lib_name=PANDAS, lib_var=PANDAS_VAR))
                self.roots.append(statement)
            elif data['type'] == 'NODE_SPLIT_DATASET':
                statement = SplitDatasetStatement(node_id=node_id, test_size=data['testSize'],
                                                  train_size=data['testSize'], shuffle=data['shuffle'])
                self.statements[node_id] = statement
                libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + MODEL_SELECTION, class_to_import=TRAIN_TEST_SPLIT))
            elif data['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
                model_type = RandomForest(num_trees=data['numTrees'], criterion=data['criterion'],
                                          max_depth=data['maxDepth'])
                statement = RandomForestStatement(node_id=node_id, model_type=model_type)
                self.statements[node_id] = statement
                libraries.add(FROM_IMPORT.format(package=SKLEARN + "." + ENSEMBLE, class_to_import=RANDOM_FOREST_CLF))
            elif data['type'] == 'NODE_ACCURACY_CLASSIFIER':
                statement = ModelAccuracyStatement(node_id=node_id)
                self.statements[node_id] = statement
                libraries.add(FROM_IMPORT.format(package=SKLEARN + "." + METRICS, class_to_import=ACCURACY_SCORE))

    def __parse_links(self):
        for link_id, data in self.json_links.items():
            source_node_id = data['source']
            source_port_id = data['sourcePort']
            target_node_id = data['target']
            target_port_id = data['targetPort']
            self.statements[source_node_id].children.append(self.statements[target_node_id])
            self.statements[target_node_id].parents.append(self.statements[source_node_id])

    def __parse_parents(self):
        for key, value in self.statements.items():
            value.parent_links = self.__get_parent_statements(key)

    # returns a list of statements that come before the statement with id==node_id
    def __get_parent_statements(self, node_id: str):
        parent_links = []
        for key, value in self.json_links.items():
            if node_id == value['target']:
                print(node_id + " " + key + " " + value['source'])
                parent_links.append(ParentLink(self.statements[value['source']], value['sourcePort']))
        return parent_links

    def __parse_ports(self, json_ports):
        ports = {}
        for p in json_ports:
            ports[p['id']] = Port(p['name'], bool(p['in']))
        return ports
