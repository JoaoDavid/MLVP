from mlvp.antlr.ast.expressions.ColumnReferenceExpression import ColumnReferenceExpression
from mlvp.antlr.ast.expressions.binary import *
from mlvp.antlr.ast.expressions.literal.LiteralExpression import LiteralExpression
from mlvp.antlr.ast.expressions.unary import *
from mlvp.antlr.ast.statements.CreateColumnStatement import CreateColumnStatement
from mlvp.typecheck import *

BINARY = "expression using invalid types \"{left}\" {operator} \"{right}\""
UNARY = "{operator} {value}"
NONEXISTENT_COLUMN = "column \"{column_name}\" does not exist on the dataset"
DUPLICATE_COLUMN = "column \"{column_name}\" is already part of the dataset"


class ValidatorAST:

    def __init__(self, root, dataset, columns):
        self.root = root
        self.dataset = dataset
        self.columns = columns
        self.assertions = []

    def validate_ast(self):
        for statement in self.root.statements:
            try:
                if isinstance(statement, CreateColumnStatement):
                    if statement.name not in self.columns:
                        expr_type = self.__expression_type(statement.expr)
                        self.assertions.append(column(self.dataset, String(statement.name)) == get_col_type(expr_type))
                        self.columns[statement.name] = expr_type
                    else:
                        z3_duplicate_column = Bool(DUPLICATE_COLUMN.format(column_name=statement.name))
                        correct_operands = False
                        self.assertions.append(z3_duplicate_column == correct_operands)
                        self.assertions.append(z3_duplicate_column)
                        raise Exception("column already created")
            except Exception as ex:
                print(ex)

        return self.assertions

    def __expression_type(self, expr):
        correct_operands = False
        if isinstance(expr, BinaryExpression):
            left = self.__expression_type(expr.left)
            right = self.__expression_type(expr.right)
            z3_binary_operation = Bool(BINARY.format(left=left, operator=str(expr), right=right))
            print("left: " + left + " right: " + right)
            print("left: " + str(expr.left) + " right: " + str(expr.right))
            if isinstance(expr, AndExpression) or isinstance(expr, OrExpression):
                if left == "bool" and right == "bool":
                    return "bool"
                else:
                    self.assertions.append(z3_binary_operation == correct_operands)
                    self.assertions.append(z3_binary_operation)
                    raise Exception("AndExpression,OrExpression")

            elif isinstance(expr, EqualExpression) or isinstance(expr, NotEqualExpression):
                return "bool"

            elif isinstance(expr, GreaterOrEqualExpression) or isinstance(expr, GreaterExpression) or \
                    isinstance(expr, LessOrEqualExpression) or isinstance(expr, LessExpression):
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
                    self.assertions.append(z3_binary_operation == correct_operands)
                    self.assertions.append(z3_binary_operation)
                    raise Exception("GreaterOrEqualExpression")

            elif isinstance(expr, SumExpression):
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
                    self.assertions.append(z3_binary_operation == correct_operands)
                    self.assertions.append(z3_binary_operation)
                    raise Exception("SumExpression")

            elif isinstance(expr, SubtractionExpression):
                if left == "int" and right == "int":
                    return "int"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                else:
                    self.assertions.append(z3_binary_operation == correct_operands)
                    self.assertions.append(z3_binary_operation)
                    raise Exception("SubtractionExpression")

            elif isinstance(expr, ModuloExpression):
                if left == "int" and right == "int":
                    return "int"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                else:
                    self.assertions.append(z3_binary_operation == correct_operands)
                    self.assertions.append(z3_binary_operation)
                    raise Exception("ModuloExpression")

            elif isinstance(expr, DivisionExpression):
                if left == "int" and right == "int":
                    return "float"
                elif left == "int" and right == "float":
                    return "float"
                elif left == "float" and right == "float":
                    return "float"
                elif left == "float" and right == "int":
                    return "float"
                else:
                    self.assertions.append(z3_binary_operation == correct_operands)
                    self.assertions.append(z3_binary_operation)
                    raise Exception("DivisionExpression")

            elif isinstance(expr, MultiplicationExpression):
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
                    self.assertions.append(z3_binary_operation == correct_operands)
                    self.assertions.append(z3_binary_operation)
                    raise Exception("MultiplicationExpression")

        elif isinstance(expr, NotExpression):
            expr_type = self.__expression_type(expr.value)
            z3_unary_operation = Bool(UNARY.format(operator=str(expr), value=expr_type))

            if expr_type == "bool":
                return "bool"
            else:
                self.assertions.append(z3_unary_operation == correct_operands)
                self.assertions.append(z3_unary_operation)
                raise Exception("NotExpression")

        elif isinstance(expr, NegativeExpression):
            expr_type = self.__expression_type(expr.value)
            z3_unary_operation = Bool(UNARY.format(operator=str(expr), value=expr_type))
            if expr_type == "int":
                return "int"
            elif expr_type == "float":
                return "float"
            else:
                self.assertions.append(z3_unary_operation == correct_operands)
                self.assertions.append(z3_unary_operation)
                raise Exception("NegativeExpression")

        elif isinstance(expr, LiteralExpression):
            return expr.lit_type

        elif isinstance(expr, ColumnReferenceExpression):
            if expr.name in self.columns:
                self.assertions.append(column(self.dataset, String(expr.name)) == get_col_type(self.columns[expr.name]))
                return self.columns[expr.name]
            else:
                z3_nonexistent_column = Bool(NONEXISTENT_COLUMN.format(column_name=expr.name))
                self.assertions.append(z3_nonexistent_column == correct_operands)
                self.assertions.append(z3_nonexistent_column)
                raise Exception("column " + expr.name + " does not exist on the dataset")
