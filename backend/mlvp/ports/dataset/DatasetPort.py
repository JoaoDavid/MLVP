from mlvp.ports.PortType import PortType


class DatasetPort(PortType):

    def __init__(self, name: str, in_port: bool):
        super().__init__(name, in_port)
