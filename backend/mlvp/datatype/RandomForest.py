from mlvp.datatype.Type import Type


class RandomForest(Type):

    def __init__(self, num_trees, criterion, max_depth):
        self.num_trees = num_trees
        self.criterion = criterion
        self.max_depth = max_depth
