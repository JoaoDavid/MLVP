from mlvp.nodes.Node import Node


class SplitDataset(Node):

    def __init__(self, node_id: str, title: str, test_size, train_size, shuffle):
        super().__init__(node_id, title)
        self.test_size = test_size
        self.train_size = train_size
        self.shuffle = shuffle
