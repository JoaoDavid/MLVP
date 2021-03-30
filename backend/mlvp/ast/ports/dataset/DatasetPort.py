from mlvp.ast.ports import PortType


class DatasetPort(PortType):

    def __init__(self, data):
        super().__init__(data)
