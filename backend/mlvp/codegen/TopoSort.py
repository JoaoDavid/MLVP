from mlvp.datatype.dataset.Csv import Csv
from mlvp.datatype.model.RandomForest import RandomForest
from mlvp.statement.DatasetDeclarationStatement import DatasetDeclarationStatement
from mlvp.statement.ModelTrainStatement import ModelTrainStatement
from mlvp.statement.ModelAccuracyStatement import ModelAccuracyStatement

NUM_NODE_LAYERS = 3


def get_layers(nodes):
    layers = [[] for _ in range(NUM_NODE_LAYERS)]
    for key, value in nodes.items():
        if value['type'] == 'NODE_IMPORT_CSV':
            layers[0].append(DatasetDeclarationStatement(node_id=key, ds_type=Csv(file_name=value['fileName'],
                                                                                  num_cols=value['numCols'],
                                                                                  num_rows=value['numRows'],
                                                                                  target=value['columnNames'][-1])))
        elif value['type'] == 'NODE_RANDOM_FOREST':
            layers[1].append(ModelTrainStatement(node_id=key, model_type=RandomForest(num_trees=value['numTrees'],
                                                                                      criterion=value['criterion'],
                                                                                      max_depth=value['maxDepth'])))
        elif value['type'] == 'NODE_ACCURACY':
            layers[2].append(ModelAccuracyStatement(node_id=key))
    return layers
