from abc import ABC, abstractmethod


class PortType(ABC):

    @abstractmethod
    def __init__(self, port_id: str, name: str, in_port: bool):
        self.port_id = port_id
        self.name = name
        self.in_port = in_port
        pass

    def __str__(self):
        return 'Class: {self.__class__.__name__} \n' \
               'Port Id: {self.port_id} \n' \
               'Name: {self.name} \n' \
               'In Port: {self.in_port} \n'.format(self=self)
