from mlvp.antlr.ast.expressions.ColumnReferenceExpression import ColumnReferenceExpression
from mlvp.antlr.ast.expressions.binary import *
from mlvp.antlr.ast.expressions.literal.LiteralExpression import LiteralExpression
from mlvp.antlr.ast.expressions.unary import *
from mlvp.antlr.ast.statements.CreateColumnStatement import CreateColumnStatement
from mlvp.antlr.ast.types import *
from mlvp.antlr.ast.types.Type import Type


def infer_number_type(left, right):
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
        self.col_types = {}

    def validate_ast(self):
        for statement in self.root.statements:
            if isinstance(statement, CreateColumnStatement):
                # adicionar ao array de assertions o tipo resultante da expressao ao nome da coluna
                expr_type = self.__expression_type(statement.expr)
                print("-----------------------------------------")
                print(expr_type)
                print(self.col_types)
                print("-----------------------------------------")

    def __infer_col_type(self, type_a, type_b, combinations):
        res_type = None
        for item in combinations:
            if isinstance(type_b, item):
                self.col_types[type_a.name].add(item)
                res_type = type_b
        return res_type

    def __expression_type(self, expr):
        res_type = None
        if isinstance(expr, BinaryExpression):
            left = self.__expression_type(expr.left)
            right = self.__expression_type(expr.right)
            if isinstance(expr, AndExpression) or isinstance(expr, OrExpression):
                if isinstance(left, BoolType) and isinstance(right, BoolType):
                    res_type = BoolType()
                elif isinstance(left, ColumnType):
                    res_type = self.__infer_col_type(left, right, [BoolType])
                elif isinstance(right, ColumnType):
                    res_type = self.__infer_col_type(right, left, [BoolType])

                if isinstance(left, ColumnType) and isinstance(right, ColumnType):
                    res_type = BoolType()
                    # TODO adicionar combinaçaoes ao array de assertions
                    # tem ambos de ser do tipo bool
                    self.assertions.append("agsg")

            elif isinstance(expr, EqualExpression) or isinstance(expr, NotEqualExpression):
                res_type = BoolType()

            elif isinstance(expr, GreaterOrEqualExpression) or isinstance(expr, GreaterExpression) or \
                    isinstance(expr, LessOrEqualExpression) or isinstance(expr, LessExpression):
                if isinstance(left, NumberType) and isinstance(right, NumberType) or \
                        isinstance(left, StringType) and isinstance(right, StringType):
                    res_type = BoolType()
                elif isinstance(left, ColumnType):
                    res_type = self.__infer_col_type(left, right, [NumberType, StringType, BoolType])
                elif isinstance(right, ColumnType):
                    res_type = self.__infer_col_type(right, left, [NumberType, StringType, BoolType])

                if isinstance(left, ColumnType) and isinstance(right, ColumnType):
                    res_type = BoolType()
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

            elif isinstance(expr, SumExpression):
                if isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = infer_number_type(left, right)
                elif isinstance(left, StringType) and isinstance(right, StringType):
                    res_type = StringType()
                elif isinstance(left, ColumnType):
                    res_type = self.__infer_col_type(left, right, [NumberType, StringType, BoolType])
                elif isinstance(right, ColumnType):
                    res_type = self.__infer_col_type(right, left, [NumberType, StringType, BoolType])

                if isinstance(left, ColumnType) and isinstance(right, ColumnType):
                    res_type = left
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

            elif isinstance(expr, SubtractionExpression) or isinstance(expr, DivisionExpression) or isinstance(expr,
                                                                                                               ModuloExpression):
                if isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = infer_number_type(left, right)
                elif isinstance(left, ColumnType):
                    res_type = self.__infer_col_type(left, right, [NumberType, BoolType])
                elif isinstance(right, ColumnType):
                    res_type = self.__infer_col_type(right, left, [NumberType, BoolType])

                if isinstance(left, ColumnType) and isinstance(right, ColumnType):
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

            elif isinstance(expr, MultiplicationExpression):
                if isinstance(left, IntType) and isinstance(right, StringType) or \
                        isinstance(right, IntType) and isinstance(left, StringType):
                    res_type = StringType
                elif isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = infer_number_type(left, right)
                elif isinstance(left, ColumnType):
                    res_type = self.__infer_col_type(left, right, [NumberType, BoolType])
                elif isinstance(right, ColumnType):
                    res_type = self.__infer_col_type(right, left, [NumberType, BoolType])

                if isinstance(left, ColumnType) and isinstance(right, StringType):
                    res_type = StringType()
                    self.col_types[left.name].add(IntType)
                if isinstance(left, StringType) and isinstance(right, ColumnType):
                    res_type = StringType()
                    self.col_types[right.name].add(IntType)

                if isinstance(left, ColumnType) and isinstance(right, ColumnType):
                    res_type = left
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

        elif isinstance(expr, NotExpression):
            if isinstance(expr.value, BoolType):
                res_type = BoolType()
            elif isinstance(expr.value, ColumnType):
                res_type = BoolType()
                self.col_types[expr.value.name].add(BoolType)

        elif isinstance(expr, NegativeExpression):
            if isinstance(expr.value, IntType) or isinstance(expr.value, FloatType):
                res_type = expr.value
            elif isinstance(expr.value, ColumnType):
                res_type = NumberType()
                self.col_types[expr.value.name].add(NumberType)
        elif isinstance(expr, LiteralExpression):
            if expr.lit_type == bool:
                res_type = BoolType()
            elif expr.lit_type == int:
                res_type = IntType()
            elif expr.lit_type == float:
                res_type = FloatType()
            elif expr.lit_type == str:
                res_type = StringType()
        elif isinstance(expr, ColumnReferenceExpression):
            # adicionar assertion ao array
            if expr.name not in self.col_types:
                self.col_types[expr.name] = set()
            res_type = ColumnType(expr.name)

        # if res_type is None:
        #     raise Exception("its None")
        return res_type
