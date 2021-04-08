from mlvp.antlr.ast.expressions.Expression import Expression


class UnaryExpression(Expression):

    def __init__(self, value, pos, symbol):
        self.value = value
        self.pos = pos
        self.symbol = symbol
        pass
