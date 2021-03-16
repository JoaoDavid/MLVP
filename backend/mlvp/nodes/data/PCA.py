from mlvp.nodes.Node import Node


class PCA(Node):

    def __init__(self, node_id: str, random_state, num_components):
        super().__init__(node_id)
        self.random_state = random_state
        self.num_components = num_components

