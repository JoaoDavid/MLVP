from abc import abstractmethod

from mlvp.antlr.ast.types.Type import Type


class NumberType(Type):

    @abstractmethod
    def __init__(self):
        super().__init__()
