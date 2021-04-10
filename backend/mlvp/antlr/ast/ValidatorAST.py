from mlvp.antlr.ast.expressions.binary import *
from mlvp.antlr.ast.statements.CreateColumnStatement import CreateColumnStatement
from mlvp.antlr.ast.types import *

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
                if all(elem in left for elem in right) and all(elem in right for elem in left):
                    res_type = BoolType()
                else:
                    raise Exception("2")
            elif isinstance(expr, SumExpression):
                if all(elem in left for elem in right) and all(elem in right for elem in left):
                    res_type = left
                else:
                    raise Exception("3")
            elif isinstance(expr, EqualExpression):
                res_type = BoolType()
            elif isinstance(expr, EqualExpression):
                res_type = BoolType()
            elif isinstance(expr, EqualExpression):
                res_type = BoolType()
            elif isinstance(expr, EqualExpression):
                res_type = BoolType()
            elif isinstance(expr, EqualExpression):
                res_type = BoolType()

        if res_type not in left + right:
            raise Exception("not bool")
        return res_type
