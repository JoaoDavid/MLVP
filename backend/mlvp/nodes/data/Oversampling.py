from mlvp.nodes.Node import Node


class Oversampling(Node):

    def __init__(self, node_id: str, title: str, random_state):
        super().__init__(node_id, title)
        self.random_state = random_state

