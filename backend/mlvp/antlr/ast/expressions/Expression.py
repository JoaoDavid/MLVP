from abc import ABC, abstractmethod

from mlvp.antlr.ast.Node import Node


class Expression(Node):

    @abstractmethod
    def __init__(self):
        pass
