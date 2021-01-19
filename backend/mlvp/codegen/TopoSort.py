NUM_NODE_LAYERS = 3


def get_layers(nodes):
    layers = [[] for _ in range(NUM_NODE_LAYERS)]
    # for key, value in nodes:
    #     print(key + " " + value)


class TopoSort:

    def __init__(self, name):
        self.counter = 0
        self.layer = [[] for _ in range(NUM_NODE_LAYERS)]
