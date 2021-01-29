from abc import ABC, abstractmethod


class Statement(ABC):

    @abstractmethod
    def __init__(self, node_id: str):
        self.node_id = node_id
        self.parent_links = []
        self.ports = {}
        self.parents = []
        self.children = []
        pass
