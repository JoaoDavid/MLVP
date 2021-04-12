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
        print(IntType)
        for statement in self.root.statements:
            if isinstance(statement, CreateColumnStatement):
                # adicionar ao array de assertions o tipo resultante da expressao ao nome da coluna
                expr_type = self.__expression_type(statement.expr)
                print("-----------------------------------------")
                print(str(expr_type))
                print(str(self.col_types))
                print("-----------------------------------------")
        # TODO, adicionar ao array de assertions que as keys de col-types estao no dataset
        for col_name, combinations in self.col_types.items():
            for combination in combinations:
                curr_combination = []
                for col_type in combination:
                    print(str(col_type))
                    str_col_type = get_col_type(str(col_type))
                    print(str_col_type)
                    print(type(str_col_type))
                    print(self.dataset)
                    print(type(self.dataset))
                    curr_combination.append(column(self.dataset, String(col_name)) == str_col_type)
                self.assertions.append(Or(curr_combination))
                print(combination)
        return self.assertions

    # type_combinations is a dict, type_b:{([possible types for type_a], res_type)}
    def __infer_col_type(self, type_a, type_b, type_combinations):
        res_type = None
        for curr_type, combinations in type_combinations.items():
            if isinstance(type_b, curr_type):
                self.col_types[type_a.name].append(combinations[0])
                res_type = combinations[1]
        return res_type

    def __expression_type(self, expr):
        res_type = None
        if isinstance(expr, BinaryExpression):
            left = self.__expression_type(expr.left)
            right = self.__expression_type(expr.right)
            if isinstance(expr, AndExpression) or isinstance(expr, OrExpression):
                type_combinations = {
                    BoolType: ([BoolType], BoolType),
                }
                if isinstance(left, BoolType) and isinstance(right, BoolType):
                    res_type = BoolType()
                elif isinstance(left, InferenceType):
                    res_type = self.__infer_col_type(left, right, type_combinations)
                elif isinstance(right, InferenceType):
                    res_type = self.__infer_col_type(right, left, type_combinations)

                if isinstance(left, InferenceType) and isinstance(right, InferenceType):
                    res_type = BoolType()
                    # TODO adicionar combinaçaoes ao array de assertions
                    # tem ambos de ser do tipo bool
                    self.assertions.append("agsg")

            elif isinstance(expr, EqualExpression) or isinstance(expr, NotEqualExpression):
                res_type = BoolType()

            elif isinstance(expr, GreaterOrEqualExpression) or isinstance(expr, GreaterExpression) or \
                    isinstance(expr, LessOrEqualExpression) or isinstance(expr, LessExpression):
                type_combinations = {
                    IntType: ([IntType, FloatType], BoolType),
                    FloatType: ([IntType, FloatType], BoolType),
                    StringType: ([StringType], BoolType),
                }
                if isinstance(left, NumberType) and isinstance(right, NumberType) or \
                        isinstance(left, StringType) and isinstance(right, StringType):
                    res_type = BoolType()
                elif isinstance(left, InferenceType):
                    res_type = self.__infer_col_type(left, right, type_combinations)
                elif isinstance(right, InferenceType):
                    res_type = self.__infer_col_type(right, left, type_combinations)

                if isinstance(left, InferenceType) and isinstance(right, InferenceType):
                    res_type = BoolType()
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

            elif isinstance(expr, SumExpression):
                type_combinations = {
                    IntType: ([IntType(), FloatType(), BoolType()], NumberType),
                    FloatType: ([IntType, FloatType, BoolType], FloatType()),
                    StringType: ([StringType], StringType()),
                    BoolType: ([IntType, FloatType, BoolType], NumberType),
                }
                if isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = infer_number_type(left, right)
                elif isinstance(left, StringType) and isinstance(right, StringType):
                    res_type = StringType()
                elif isinstance(left, InferenceType):
                    res_type = self.__infer_col_type(left, right, type_combinations)
                elif isinstance(right, InferenceType):
                    res_type = self.__infer_col_type(right, left, type_combinations)

                if isinstance(left, InferenceType) and isinstance(right, InferenceType):
                    res_type = left
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

            elif isinstance(expr, SubtractionExpression) or isinstance(expr, DivisionExpression) or \
                    isinstance(expr, ModuloExpression):
                type_combinations = {
                    IntType: ([IntType, FloatType], NumberType),
                    FloatType: ([IntType, FloatType], FloatType),
                    BoolType: ([IntType, FloatType], NumberType),
                }
                if isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = infer_number_type(left, right)
                elif isinstance(left, InferenceType):
                    res_type = self.__infer_col_type(left, right, type_combinations)
                elif isinstance(right, InferenceType):
                    res_type = self.__infer_col_type(right, left, type_combinations)

                if isinstance(left, InferenceType) and isinstance(right, InferenceType):
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

            elif isinstance(expr, MultiplicationExpression):
                type_combinations = {
                    IntType: ([IntType, FloatType, StringType], InferenceType),
                    FloatType: ([IntType, FloatType], FloatType),
                    BoolType: ([IntType, FloatType, BoolType], NumberType),
                    StringType: ([IntType], StringType),
                }
                if isinstance(left, IntType) and isinstance(right, StringType) or \
                        isinstance(right, IntType) and isinstance(left, StringType):
                    res_type = StringType()
                elif isinstance(left, NumberType) and isinstance(right, NumberType):
                    res_type = infer_number_type(left, right)
                elif isinstance(left, InferenceType):
                    res_type = self.__infer_col_type(left, right, type_combinations)
                elif isinstance(right, InferenceType):
                    res_type = self.__infer_col_type(right, left, type_combinations)

                if isinstance(left, InferenceType) and isinstance(right, InferenceType):
                    res_type = left
                    # TODO adicionar combinaçaoes ao array de assertions
                    self.assertions.append("agsg")

        elif isinstance(expr, NotExpression):
            if isinstance(expr.value, BoolType):
                res_type = BoolType()
            elif isinstance(expr.value, InferenceType):
                res_type = BoolType()
                self.col_types[expr.value.name].add(BoolType)

        elif isinstance(expr, NegativeExpression):
            if isinstance(expr.value, IntType) or isinstance(expr.value, FloatType):
                res_type = expr.value
            elif isinstance(expr.value, InferenceType):
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
                self.col_types[expr.name] = []
            res_type = InferenceType(expr.name)

        # if res_type is None:
        #     raise Exception("its None")
        return res_type
