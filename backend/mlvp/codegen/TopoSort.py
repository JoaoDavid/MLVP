from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.datatype.dataset.Csv import Csv
from mlvp.datatype.model.RandomForest import RandomForest
from mlvp.statement import DatasetDeclarationStatement
from mlvp.statement import ModelAccuracyStatement
from mlvp.statement import RandomForestStatement
from mlvp.statement import SplitDatasetStatement
from mlvp.statement import Port, ParentLink


class TopoSort:

    def __init__(self, json_nodes, json_links, num_tiers):
        self.json_nodes = json_nodes
        self.json_links = json_links
        self.num_tiers = num_tiers
        self.statements = {}
        self.ports = {}

    def get_layers(self):
        layers = [[] for _ in range(self.num_tiers)]
        libraries = set()
        for key, value in self.json_nodes.items():
            tier = int(value['tier'])
            ports = self.__parse_ports(value['ports'])
            if value['type'] == 'NODE_IMPORT_CSV':
                ds_type = Csv(file_name=value['fileName'], num_cols=value['numCols'], num_rows=value['numRows'],
                              target=value['columnNames'][-1])
                statement = DatasetDeclarationStatement(node_id=key, ds_type=ds_type)
                statement.ports = ports
                layers[tier].append(statement)
                self.statements[key] = statement
                libraries.add(IMPORT_AS.format(lib_name=PANDAS, lib_var=PANDAS_VAR))
            elif value['type'] == 'NODE_SPLIT_DATASET':
                statement = SplitDatasetStatement(node_id=key, test_size=value['testSize'],
                                                  train_size=value['testSize'], shuffle=value['shuffle'])
                statement.ports = ports
                layers[tier].append(statement)
                self.statements[key] = statement
                libraries.add(
                    FROM_IMPORT.format(package=SKLEARN + "." + MODEL_SELECTION, class_to_import=TRAIN_TEST_SPLIT))
            elif value['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
                model_type = RandomForest(num_trees=value['numTrees'], criterion=value['criterion'],
                                          max_depth=value['maxDepth'])
                statement = RandomForestStatement(node_id=key, model_type=model_type)
                statement.ports = ports
                layers[tier].append(statement)
                self.statements[key] = statement
                libraries.add(FROM_IMPORT.format(package=SKLEARN + "." + ENSEMBLE, class_to_import=RANDOM_FOREST_CLF))
            elif value['type'] == 'NODE_ACCURACY_CLASSIFIER':
                statement = ModelAccuracyStatement(node_id=key)
                statement.ports = ports
                layers[tier].append(statement)
                self.statements[key] = statement
        self.__parse_parents()
        return layers, libraries

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
