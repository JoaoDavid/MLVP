from mlvp.antlr.ast.expressions.Expression import Expression


class ColumnReferenceExpression(Expression):

    def __init__(self, name, pos):
        self.name = name
        self.pos = pos
