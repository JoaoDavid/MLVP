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

    def __init__(self, root, dataset, columns):
        self.root = root
        self.dataset = dataset
        self.columns = columns
        self.assertions = []
        self.col_types = {}

    def validate_ast(self):
        for statement in self.root.statements:
            if isinstance(statement, CreateColumnStatement):
                # adicionar ao array de assertions o tipo resultante da expressao ao nome da coluna
                if statement.name not in self.columns:
                    expr_type = self.__expression_type(statement.expr)
                    self.assertions.append(column(self.dataset, String(statement.name)) == get_col_type(expr_type))
                    self.columns[statement.name] = expr_type
                else:
                    raise Exception("column already created")
                # print("-----------------------------------------")
                # print(str(expr_type))
                # print(str(self.col_types))
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
                # print(res_type)
        return res_type

    def __expression_type(self, expr):
        res_type = None
        if isinstance(expr, BinaryExpression):
            left = self.__expression_type(expr.left)
            right = self.__expression_type(expr.right)
            if isinstance(expr, AndExpression) or isinstance(expr, OrExpression):

                if left == "bool" and right == "bool":
                    return "bool"
                else:
                    raise Exception("AndExpression,OrExpression")

                self.assertions.append(
                    Or(
                        And(left == ColumnType.bool, right == ColumnType.bool, and_or(left, right) == ColumnType.bool)
                    )
                )
                return and_or(left, right)

            elif isinstance(expr, EqualExpression) or isinstance(expr, NotEqualExpression):
                return "bool"

            elif isinstance(expr, GreaterOrEqualExpression) or isinstance(expr, GreaterExpression) or \
                    isinstance(expr, LessOrEqualExpression) or isinstance(expr, LessExpression):
                # res_type = compare_dimension(left, right)

                if left == "int" and right == "int":
                    return "bool"
                elif left == "int" and right == "float":
                    return "bool"
                elif left == "float" and right == "float":
                    return "bool"
                elif left == "float" and right == "int":
                    return "bool"
                elif left == "string" and right == "string":
                    return "bool"
                else:
                    raise Exception("GreaterOrEqualExpression")

                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int, res_type == ColumnType.bool),
                        And(left == ColumnType.int, right == ColumnType.float, res_type == ColumnType.bool),
                        And(left == ColumnType.float, right == ColumnType.float, res_type == ColumnType.bool),
                        And(left == ColumnType.float, right == ColumnType.int, res_type == ColumnType.bool),
                        And(left == ColumnType.string, right == ColumnType.string, res_type == ColumnType.bool),
                    )
                )
                return res_type

            elif isinstance(expr, SumExpression):
                # res_type = plus(left, right)

                if left == "int" and right == "int":
                    return "int"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                elif left == "string" and right == "string":
                    return "string"
                else:
                    raise Exception("SumExpression")

                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int, res_type == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int, res_type == ColumnType.float),
                        And(left == ColumnType.string, right == ColumnType.string, res_type == ColumnType.string),
                    )
                )
                return res_type
            elif isinstance(expr, SubtractionExpression):
                # res_type = sub(left, right)

                if left == "int" and right == "int":
                    return "int"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                else:
                    raise Exception("SubtractionExpression")

                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int, res_type == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int, res_type == ColumnType.float),
                    )
                )
                return res_type
            elif isinstance(expr, ModuloExpression):
                # res_type = mod(left, right)

                if left == "int" and right == "int":
                    return "int"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                else:
                    raise Exception("ModuloExpression")

                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int, res_type == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int, res_type == ColumnType.float),
                    )
                )
                return res_type
            elif isinstance(expr, DivisionExpression):
                # res_type = div(left, right)

                if left == "int" and right == "int":
                    return "float"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                else:
                    raise Exception("DivisionExpression")

                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int, res_type == ColumnType.float),
                        And(left == ColumnType.int, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int, res_type == ColumnType.float),
                    )
                )
                return res_type
            elif isinstance(expr, MultiplicationExpression):
                # res_type = multiplication(left, right)

                if left == "int" and right == "int":
                    return "int"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                elif left == "int" and right == "string":
                    return "string"
                elif left == "string" and right == "int":
                    return "string"
                else:
                    raise Exception("MultiplicationExpression")

                self.assertions.append(
                    Or(
                        And(left == ColumnType.int, right == ColumnType.int, res_type == ColumnType.int),
                        And(left == ColumnType.int, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.float, res_type == ColumnType.float),
                        And(left == ColumnType.float, right == ColumnType.int, res_type == ColumnType.float),
                        And(left == ColumnType.int, right == ColumnType.string, res_type == ColumnType.string),
                        And(left == ColumnType.string, right == ColumnType.int, res_type == ColumnType.string),
                    )
                )
                return res_type
        elif isinstance(expr, NotExpression):
            expr_type = self.__expression_type(expr.value)
            # res_type = negate(expr_type)

            if expr_type == "bool":
                return "bool"
            else:
                raise Exception("NotExpression")

            self.assertions.append(
                Or(
                    And(expr_type == ColumnType.bool, res_type == ColumnType.bool),
                )
            )
            return res_type

        elif isinstance(expr, NegativeExpression):
            expr_type = self.__expression_type(expr.value)
            # res_type = negative(expr_type)

            if expr_type == "int":
                return "int"
            elif expr_type == "float":
                return "float"
            else:
                raise Exception("NegativeExpression")

            self.assertions.append(
                Or(
                    And(expr_type == ColumnType.int, res_type == ColumnType.int),
                    And(expr_type == ColumnType.float, res_type == ColumnType.float),
                )
            )
            return res_type

        elif isinstance(expr, LiteralExpression):
            return expr.lit_type
        elif isinstance(expr, ColumnReferenceExpression):
            if expr.name in self.columns:
                # res_type = column(self.dataset, String(expr.name))
                # self.assertions.append(column_exists(self.dataset, String(expr.name)))
                self.assertions.append(column(self.dataset, String(expr.name)) == get_col_type(self.columns[expr.name]))
                return self.columns[expr.name]
            else:
                print("non existent column")
                raise Exception("column " + expr.name + " does not exist on the dataset")

        return res_type
