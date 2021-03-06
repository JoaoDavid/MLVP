from abc import abstractmethod

from mlvp.antlr.ast.expressions.Expression import Expression


class BinaryExpression(Expression):

    @abstractmethod
    def __init__(self, left, right, pos):
        super().__init__()
        self.left = left
        self.right = right
        self.pos = pos
