from mlvp.graph.ports import Port


class LayerPort(Port):

    def __init__(self, data):
        super().__init__(data)
        self.num_layers = 0
