from mlvp.antlr.ast.expressions.Expression import Expression


class LiteralExpression(Expression):

    def __init__(self, value, lit_type, pos):
        self.value = value
        self.lit_type = lit_type
        self.pos = pos
        pass
