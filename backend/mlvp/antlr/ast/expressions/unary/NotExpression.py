from mlvp.antlr.ast.expressions.unary.UnaryExpression import UnaryExpression


class NotExpression(UnaryExpression):

    def __init__(self, value, pos):
        super().__init__(value, pos)

    def __str__(self):
        return "not"
