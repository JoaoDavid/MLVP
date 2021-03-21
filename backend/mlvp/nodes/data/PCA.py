from mlvp.nodes.Node import Node


class PCA(Node):

    def __init__(self, node_id: str, title: str, random_state, num_components):
        super().__init__(node_id, title)
        self.random_state = random_state
        self.num_components = num_components

