from mlvp.antlr.ast.FeatureEngProg import FeatureEngProg
from mlvp.antlr.ast.statements.CreateColumnStatement import CreateColumnStatement
from mlvp.antlr.ast.expressions.literal.LiteralExpression import LiteralExpression
from mlvp.antlr.ast.expressions.ColumnReferenceExpression import ColumnReferenceExpression
from mlvp.antlr.ast.expressions.binary import *
from mlvp.antlr.ast.expressions.unary import *
from mlvp.antlr.ast.Position import Position


class TreeVisitor:

    def visit_tree(self, ctx):
        statements = []
        if ctx.children is not None:
            for child in ctx.children:
                statements.append(self.__visit_statement(child))
        return FeatureEngProg(statements)

    def __visit_statement(self, ctx):
        if ctx.create_col_stat() is not None:
            return self.__visit_create_col_stat(ctx.create_col_stat())

    def __visit_create_col_stat(self, ctx):
        expr = self.__visit_expression(ctx.expr())
        if ctx.ID() is not None:
            return CreateColumnStatement(ctx.ID().getText(), expr, Position(ctx))

    def __visit_expression(self, ctx):
        if ctx.unary_ope() is not None:
            return self.__visit_unary_expression(ctx)
        elif ctx.BOOL() is not None:
            return LiteralExpression(ctx.BOOL().getText(), "bool", Position(ctx))
        elif ctx.INT() is not None:
            return LiteralExpression(ctx.INT().getText(), "int", Position(ctx))
        elif ctx.FLOAT() is not None:
            return LiteralExpression(ctx.FLOAT().getText(), "float", Position(ctx))
        elif ctx.STRING() is not None:
            return LiteralExpression(ctx.STRING().getText(), "string", Position(ctx))
        elif ctx.ID() is not None:
            return ColumnReferenceExpression(ctx.ID().getText(), Position(ctx))
        elif ctx.L_RND_BR() is not None:
            return self.__visit_expression(ctx.expr(0))
        else:
            return self.__visit_binary_expression(ctx)

    def __visit_unary_expression(self, ctx):
        expr = self.__visit_expression(ctx.expr(0))
        if ctx.unary_ope().NOT() is not None:
            return NotExpression(expr, Position(ctx))
        elif ctx.unary_ope().MINUS() is not None:
            return NegativeExpression(expr, Position(ctx))

    def __visit_binary_expression(self, ctx):
        left = self.__visit_expression(ctx.expr(0))
        right = self.__visit_expression(ctx.expr(1))
        if ctx.AND() is not None:
            return AndExpression(left, right, Position(ctx))
        elif ctx.OR() is not None:
            return OrExpression(left, right, Position(ctx))
        elif ctx.EQUAL() is not None:
            return EqualExpression(left, right, Position(ctx))
        elif ctx.NOT_EQUAL() is not None:
            return NotEqualExpression(left, right, Position(ctx))
        elif ctx.GREATER_EQ() is not None:
            return GreaterOrEqualExpression(left, right, Position(ctx))
        elif ctx.GREATER() is not None:
            return GreaterExpression(left, right, Position(ctx))
        elif ctx.LESS_EQ() is not None:
            return LessOrEqualExpression(left, right, Position(ctx))
        elif ctx.LESS() is not None:
            return LessExpression(left, right, Position(ctx))
        elif ctx.PLUS() is not None:
            return SumExpression(left, right, Position(ctx))
        elif ctx.MINUS() is not None:
            return SubtractionExpression(left, right, Position(ctx))
        elif ctx.TIMES() is not None:
            return MultiplicationExpression(left, right, Position(ctx))
        elif ctx.DIV() is not None:
            return DivisionExpression(left, right, Position(ctx))
        elif ctx.MOD() is not None:
            return ModuloExpression(left, right, Position(ctx))
