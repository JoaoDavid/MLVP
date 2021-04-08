from mlvp.antlr.ast.expressions.Expression import Expression


class BinaryExpression(Expression):

    def __init__(self, left, right, pos, symbol):
        self.left = left
        self.right = right
        self.pos = pos
        self.symbol = symbol
        pass
