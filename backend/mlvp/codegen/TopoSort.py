from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.datatype.dataset.Csv import Csv
from mlvp.datatype.model.RandomForest import RandomForest
from mlvp.statement import DatasetDeclarationStatement
from mlvp.statement import ModelAccuracyStatement
from mlvp.statement import RandomForestStatement
from mlvp.statement import SplitDatasetStatement

NUM_NODE_LAYERS = 4


class TopoSort:

    def __init__(self, json_nodes, json_links):
        self.json_nodes = json_nodes
        self.json_links = json_links
        self.statements = {}

    def get_layers(self):
        layers = [[] for _ in range(NUM_NODE_LAYERS)]
        libraries = set()
        for key, value in self.json_nodes.items():
            if value['type'] == 'NODE_IMPORT_CSV':
                ds_type = Csv(file_name=value['fileName'], num_cols=value['numCols'], num_rows=value['numRows'],
                              target=value['columnNames'][-1])
                statement = DatasetDeclarationStatement(node_id=key, ds_type=ds_type)
                layers[0].append(statement)
                self.statements[key] = statement
                libraries.add(IMPORT_AS.format(lib_name=PANDAS, lib_var=PANDAS_VAR))
            elif value['type'] == 'NODE_SPLIT_DATASET':
                statement = SplitDatasetStatement(node_id=key, test_size=value['testSize'])
                layers[2].append(statement)
                self.statements[key] = statement
                libraries.add(FROM_IMPORT.format(package=SKLEARN+"."+MODEL_SELECTION, class_to_import=TRAIN_TEST_SPLIT))
            elif value['type'] == 'NODE_RANDOM_FOREST':
                model_type = RandomForest(num_trees=value['numTrees'], criterion=value['criterion'],
                                          max_depth=value['maxDepth'])
                statement = RandomForestStatement(node_id=key, model_type=model_type)
                layers[2].append(statement)
                self.statements[key] = statement
                libraries.add(FROM_IMPORT.format(package=SKLEARN+"."+ENSEMBLE, class_to_import=RANDOM_FOREST_CLF))
            elif value['type'] == 'NODE_ACCURACY':
                statement = ModelAccuracyStatement(node_id=key)
                layers[3].append(statement)
                self.statements[key] = statement
        self.__parse_parents()
        return layers, libraries

    def __parse_parents(self):
        for key, value in self.statements.items():
            parents = self.__get_parent_statements(key)
            value.parents = parents

    # returns a list of statements that come before the statement with id==node_id
    def __get_parent_statements(self, node_id: str):
        parents = []
        for key, value in self.json_links.items():
            if node_id == value['target']:
                print(node_id + " " + key + " " + value['source'])
                parents.append(self.statements[value['source']])
        return parents
