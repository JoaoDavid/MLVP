from mlvp.antlr.ast.expressions.binary.BinaryExpression import BinaryExpression


class ModuloExpression(BinaryExpression):

    def __init__(self, left, right, pos):
        super().__init__(left, right, pos)