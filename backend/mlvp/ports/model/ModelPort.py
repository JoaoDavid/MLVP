from mlvp.ports.PortType import PortType


class ModelPort(PortType):

    def __init__(self, port_id: str, name: str, in_port: bool):
        super().__init__(port_id, name, in_port)
