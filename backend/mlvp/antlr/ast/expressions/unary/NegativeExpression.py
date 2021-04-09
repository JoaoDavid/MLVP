from mlvp.antlr.ast.expressions.unary.UnaryExpression import UnaryExpression


class NegativeExpression(UnaryExpression):

    def __init__(self, value, pos):
        super().__init__(value, pos)
