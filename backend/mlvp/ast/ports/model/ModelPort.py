from mlvp.ast.ports import PortType


class ModelPort(PortType):

    def __init__(self, data):
        super().__init__(data)
