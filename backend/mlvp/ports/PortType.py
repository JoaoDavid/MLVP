from abc import ABC, abstractmethod


class PortType(ABC):

    @abstractmethod
    def __init__(self, port_id: str, name: str, in_port: bool):
        self.port_id = port_id
        self.name = name
        self.in_port = in_port
        pass
