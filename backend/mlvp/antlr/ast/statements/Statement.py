from abc import abstractmethod

from mlvp.antlr.ast.Node import Node


class Statement(Node):

    @abstractmethod
    def __init__(self):
        pass
