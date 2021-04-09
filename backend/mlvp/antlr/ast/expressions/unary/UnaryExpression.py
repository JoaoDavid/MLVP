from abc import abstractmethod

from mlvp.antlr.ast.expressions.Expression import Expression


class UnaryExpression(Expression):

    @abstractmethod
    def __init__(self, value, pos):
        self.value = value
        self.pos = pos
        pass
