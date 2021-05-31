from abc import ABC, abstractmethod


class Port(ABC):

    @abstractmethod
    def __init__(self, data):
        self.port_id = data['id']
        self.name = data['name']
        self.in_port = bool(data['in'])
        pass

    def __str__(self):
        return 'Class: {self.__class__.__name__} \n' \
               'Port Id: {self.port_id} \n' \
               'Name: {self.name} \n' \
               'In Port: {self.in_port} \n'.format(self=self)
