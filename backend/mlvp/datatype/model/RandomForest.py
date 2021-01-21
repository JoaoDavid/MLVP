from mlvp.datatype.model.Model import Model


class RandomForest(Model):

    def __init__(self, num_trees, criterion, max_depth):
        super().__init__()
        self.num_trees = num_trees
        self.criterion = criterion
        self.max_depth = max_depth

    def __str__(self):
        return type(self).__name__ + " " + str(self.num_trees) + " " + str(self.criterion) + " " + str(self.max_depth)
