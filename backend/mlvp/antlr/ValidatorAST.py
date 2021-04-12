from mlvp.antlr.ast.expressions.ColumnReferenceExpression import ColumnReferenceExpression
from mlvp.antlr.ast.expressions.binary import *
from mlvp.antlr.ast.expressions.literal.LiteralExpression import LiteralExpression
from mlvp.antlr.ast.expressions.unary import *
from mlvp.antlr.ast.statements.CreateColumnStatement import CreateColumnStatement
from mlvp.antlr.ast.types import *
from mlvp.typecheck import *


def infer_number_type(left, right):
    if isinstance(left, IntType) and isinstance(right, FloatType):
        return right
    elif isinstance(left, FloatType) and isinstance(right, IntType):
        return left
    else:
        return left


def get_col_type_2(col):
    if isinstance(col, IntType) or col == IntType:
        return ColumnType.int
    elif isinstance(col, FloatType) or col == FloatType:
        return ColumnType.float
    elif isinstance(col, StringType) or col == StringType:
        return ColumnType.string


class ValidatorAST:

    def __init__(self, root, dataset):
        self.root = root
        self.dataset = dataset
        self.assertions = []
        self.col_types = {}

    def validate_ast(self):
        for statement in self.root.statements:
            if isinstance(statement, CreateColumnStatement):
                # adicionar ao array de assertions o tipo resultante da expressao ao nome da coluna
                expr_type = self.__expression_type(statement.expr)
                self.assertions.append(column(self.dataset, String(statement.name)) == expr_type)
                print("-----------------------------------------")
                print(str(expr_type))
                print(str(self.col_types))
        # TODO, adicionar ao array de assertions que as keys de col-types estao no dataset
        for col_name, combinations in self.col_types.items():
            for combination in combinations:
                curr_combination = []
                for col_type in combination:
                    str_col_type = get_col_type(str(col_type()))
                    curr_combination.append(column(self.dataset, String(col_name)) == str_col_type)
                self.assertions.append(Or(curr_combination))
        return self.assertions

    # type_combinations is a dict, type_b:{([possible types for type_a], res_type)}
    def __infer_col_type(self, type_a, type_b, type_combinations):
        res_type = None
        for curr_type, combinations in type_combinations.items():
            if isinstance(type_b, curr_type):
                self.col_types[type_a.name].append(combinations[0])
                res_type = combinations[1]()
                print(res_type)
        return res_type

    def __expression_type(self, expr):
        res_type = None
        if isinstance(expr, BinaryExpression):
            left = self.__expression_type(expr.left)
            right = self.__expression_type(expr.right)
            if isinstance(expr, AndExpression) or isinstance(expr, OrExpression):
                self.assertions.append(
                    Or(
                        And(left == ColumnType.bool, right == ColumnType.bool),
                    )
                )
                return and_or(left, right)

            elif isinstance(expr, EqualExpression) or isinstance(expr, NotEqualExpression):
                return ColumnType.bool

            elif isinstance(expr, GreaterOrEqualExpression) or isinstance(expr, GreaterExpression) or \
                    isinstance(expr, LessOrEqualExpression) or isinstance(expr, LessExpression):
                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int),
                        And(left == ColumnType.string, right == ColumnType.string),
                    )
                )
                return compare_dimension(left, right)

            elif isinstance(expr, SumExpression):
                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int),
                        And(left == ColumnType.string, right == ColumnType.string),
                    )
                )
                return plus(left, right)
            elif isinstance(expr, SubtractionExpression) or isinstance(expr, DivisionExpression) or \
                    isinstance(expr, ModuloExpression):
                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int),
                    )
                )
                return sub_div_mod(left, right)
            elif isinstance(expr, MultiplicationExpression):
                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.string),
                        And(left == ColumnType.string, right == ColumnType.int),
                    )
                )
                return multiplication(left, right)
        elif isinstance(expr, NotExpression):
            expr_type = self.__expression_type(expr.value)
            self.assertions.append(expr_type == ColumnType.bool)
            return expr_type

        elif isinstance(expr, NegativeExpression):
            expr_type = self.__expression_type(expr.value)
            self.assertions.append(Or(expr_type == ColumnType.int, expr_type == ColumnType.float))
            return expr_type

        elif isinstance(expr, LiteralExpression):
            if expr.lit_type == bool:
                res_type = ColumnType.bool
            elif expr.lit_type == int:
                res_type = ColumnType.int
            elif expr.lit_type == float:
                res_type = ColumnType.float
            elif expr.lit_type == str:
                res_type = ColumnType.string
        elif isinstance(expr, ColumnReferenceExpression):
            res_type = column(self.dataset, String(expr.name))

        # if res_type is None:
        #     raise Exception("its None")
        return res_type
