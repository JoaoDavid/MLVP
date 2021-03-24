from abc import ABC, abstractmethod


class Node(ABC):

    @abstractmethod
    def __init__(self, node_id: str, title: str):
        self.node_id = node_id
        self.title = title
        self.parent_links = []
        self.ports = {}
        self.children = []
        self.visited = False
        pass

    def get_port(self, in_port: bool, name: str):
        for _, port in self.ports.items():
            if name == port.name and port.in_port == in_port:
                return port

    def type_check(self):
        pass

    def assertions(self):
        pass

    def codegen(self):
        pass

    def __str__(self):
        return 'Class: {self.__class__.__name__} \n' \
               'Node Id: {self.node_id} \n' \
               'Parent Links: {self.parent_links} \n' \
               'Ports: {self.ports} \n' \
               'Children: {self.children} \n' \
               'Visited: {self.visited} \n'.format(self=self)
