from mlvp.datatype.dataset.Dataset import Dataset
from mlvp.datatype.model.Model import Model
from mlvp.datatype.ModelAccuracy import ModelAccuracy

NUM_NODE_LAYERS = 3


def get_layers(nodes):
    layers = [[] for _ in range(NUM_NODE_LAYERS)]
    for key, value in nodes.items():
        if value['type'] == 'NODE_IMPORT_CSV':
            layers[0].append(Dataset(file_name=value['fileName'], num_cols=value['numCols'], num_rows=value['numCols'], label=value['columnNames'][-1]))
        elif value['type'] == 'NODE_RANDOM_FOREST':
            layers[1].append(Model(num_trees=value['numTrees'], criterion=value['criterion'], max_depth=value['maxDepth']))
        elif value['type'] == 'NODE_ACCURACY':
            layers[2].append(ModelAccuracy())
    return layers

