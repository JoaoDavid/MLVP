from mlvp.graph.ports import Port


class DatasetPort(Port):

    def __init__(self, data):
        super().__init__(data)
        self.columns = {}
        self.encoded_columns = {}
