from mlvp.datatype.dataset.Csv import Csv
from mlvp.datatype.model.RandomForest import RandomForest
from mlvp.statement.DatasetDeclarationStatement import DatasetDeclarationStatement
from mlvp.statement.ModelTrainStatement import ModelTrainStatement
from mlvp.statement.ModelAccuracyStatement import ModelAccuracyStatement

NUM_NODE_LAYERS = 3


class TopoSort:

    def __init__(self, json_nodes, json_links):
        self.json_nodes = json_nodes
        self.json_links = json_links
        self.nodes = {}

    def get_layers(self):
        layers = [[] for _ in range(NUM_NODE_LAYERS)]
        nodes = {}
        for key, value in self.json_nodes.items():
            if value['type'] == 'NODE_IMPORT_CSV':
                ds_type = Csv(file_name=value['fileName'], num_cols=value['numCols'], num_rows=value['numRows'],
                              target=value['columnNames'][-1])
                layers[0].append(DatasetDeclarationStatement(node_id=key, ds_type=ds_type))
                self.nodes[key] = ds_type
            elif value['type'] == 'NODE_RANDOM_FOREST':
                model_type = RandomForest(num_trees=value['numTrees'], criterion=value['criterion'],
                                          max_depth=value['maxDepth'])
                layers[1].append(ModelTrainStatement(node_id=key, model_type=model_type))
                self.nodes[key] = model_type
            elif value['type'] == 'NODE_ACCURACY':
                layers[2].append(ModelAccuracyStatement(node_id=key))

        return layers

    def __parse_links(self, node_id: str):
        for key, value in self.json_links.items():
            if node_id == value['target']:
                print("testing")
