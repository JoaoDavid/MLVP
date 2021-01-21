from abc import ABC, abstractmethod


class Statement(ABC):

    @abstractmethod
    def __init__(self, node_id: str, parents):
        self.node_id = node_id
        self.parents = parents
        pass
