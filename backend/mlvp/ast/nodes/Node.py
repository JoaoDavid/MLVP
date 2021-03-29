from abc import ABC, abstractmethod


class Node(ABC):

    @abstractmethod
    def __init__(self, data):
        self.node_id = data['id']
        self.title = data['title']
        self.is_root = bool(data['isRoot'])
        self.parent_links = []
        self.ports = {}
        self.children = []
        self.visited = False
        pass

    def get_port(self, in_port: bool, name: str):
        for _, port in self.ports.items():
            if name == port.name and port.in_port == in_port:
                return port

    @abstractmethod
    def import_dependency(self):
        pass

    @abstractmethod
    def codegen(self, emitter, out_file):
        pass

    @abstractmethod
    def assertions(self):
        pass

    def __str__(self):
        return 'Class: {self.__class__.__name__} \n' \
               'Node Id: {self.node_id} \n' \
               'Parent Links: {self.parent_links} \n' \
               'Ports: {self.ports} \n' \
               'Children: {self.children} \n' \
               'Visited: {self.visited} \n'.format(self=self)
