from abc import ABC, abstractmethod


class Node(ABC):

    @abstractmethod
    def __init__(self, node_id: str):
        self.node_id = node_id
        self.parent_links = []
        self.ports = {}
        self.children = []
        self.visited = False
        pass

    def get_port(self, name: str, is_in: bool):
        for _, port in self.ports.items():
            if name == port.name and port.in_port == is_in:
                return port
