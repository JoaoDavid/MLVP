from mlvp.antlr.ast.expressions.ColumnReferenceExpression import ColumnReferenceExpression
from mlvp.antlr.ast.expressions.binary import *
from mlvp.antlr.ast.expressions.literal.LiteralExpression import LiteralExpression
from mlvp.antlr.ast.expressions.unary import *
from mlvp.antlr.ast.statements.CreateColumnStatement import CreateColumnStatement
from mlvp.antlr.ast.types import *


def __infer_number_type(left, right):
    if isinstance(left, IntType) and isinstance(right, FloatType):
        return right
    elif isinstance(left, FloatType) and isinstance(right, IntType):
        return left
    else:
        return left


class ValidatorAST:

    def __init__(self, root):
        self.root = root
        self.assertions = []

    def validate_ast(self, root):
        if isinstance(root, CreateColumnStatement):
            # adicionar ao array de assertions o tipo resultante da expressao ao nome da coluna
            expr_type = self.__expression_type(root.expr)
            print("gaegea")

    def __expression_type(self, expr):
        res_type = None
        if isinstance(expr, BinaryExpression):
            left = self.__expression_type(expr.left)
            right = self.__expression_type(expr.right)
            if isinstance(expr, AndExpression) or isinstance(expr, OrExpression):
                res_type = BoolType()

            elif isinstance(expr, EqualExpression) or isinstance(expr, NotEqualExpression):
                res_type = BoolType()

            elif isinstance(expr, GreaterOrEqualExpression) or isinstance(expr, GreaterExpression) or\
                    isinstance(expr, LessOrEqualExpression) or isinstance(expr, LessExpression):
                if isinstance(left, NumberType) and isinstance(right, NumberType) or\
                        isinstance(left, StringType) and isinstance(right, StringType):
                    res_type = BoolType()
                else:
                    raise Exception("2")

            elif isinstance(expr, SumExpression):
                if isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = self.__infer_number_type(left, right)
                elif isinstance(left, StringType) and isinstance(right, StringType):
                    res_type = StringType()
                else:
                    raise Exception("3")
            elif isinstance(expr, SubtractionExpression) or isinstance(expr, DivisionExpression) or isinstance(expr, ModuloExpression):
                if isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = self.__infer_number_type(left, right)
                else:
                    raise Exception("3")

            elif isinstance(expr, MultiplicationExpression):
                if isinstance(left, IntType) and isinstance(right, StringType) or \
                        isinstance(right, IntType) and isinstance(left, StringType):
                    res_type = StringType
                elif isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = self.__infer_number_type(left, right)

        elif isinstance(expr, NotExpression):
            res_type = BoolType()
        elif isinstance(expr, NegativeExpression):
            if isinstance(expr.value, IntType) or isinstance(expr.value, FloatType):
                res_type = expr.value
        elif isinstance(expr, LiteralExpression):
            if expr.value == bool:
                res_type = BoolType()
            elif expr.value == int:
                res_type = IntType()
            elif expr.value == float:
                res_type = FloatType()
            elif expr.value == str:
                res_type = StringType()
        elif isinstance(expr, ColumnReferenceExpression):
            # adicionar assertion ao array
            res_type = None
        return res_type
