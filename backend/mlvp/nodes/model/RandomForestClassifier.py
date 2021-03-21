from mlvp.nodes.model.ModelTrain import ModelTrain


class RandomForestClassifier(ModelTrain):

    def __init__(self, node_id: str, title: str, num_trees, criterion, max_depth):
        super().__init__(node_id, title)
        self.num_trees = num_trees
        self.criterion = criterion
        self.max_depth = max_depth
