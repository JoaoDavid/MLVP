from mlvp.ast.ports import PortType


class RegressorPort(PortType):

    def __init__(self, data):
        super().__init__(data)
