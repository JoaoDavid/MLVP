from mlvp.antlr.ast.expressions.Expression import Expression
from mlvp.antlr.ast.statements.Statement import Statement


class CreateColumnStatement(Statement):

    def __init__(self, name, expr: Expression, pos):
        self.name = name
        self.expr = expr
        self.pos = pos
