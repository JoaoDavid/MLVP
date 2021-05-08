from mlvp.graph.ports import PortType


class DatasetPort(PortType):

    def __init__(self, data):
        super().__init__(data)
        self.columns = {}
        self.encoded_columns = {}
