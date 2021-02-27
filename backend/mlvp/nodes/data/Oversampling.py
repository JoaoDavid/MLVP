from mlvp.nodes.Node import Node


class Oversampling(Node):

    def __init__(self, node_id: str, random_state):
        super().__init__(node_id)
        self.random_state = random_state

