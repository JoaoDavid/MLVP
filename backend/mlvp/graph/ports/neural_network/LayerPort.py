from mlvp.graph.ports import PortType


class LayerPort(PortType):

    def __init__(self, data):
        super().__init__(data)
        self.num_layers = 0
