from abc import ABC, abstractmethod


class PortType(ABC):

    @abstractmethod
    def __init__(self, name: str, in_port: bool):
        self.name = name
        self.in_port = in_port
        pass
