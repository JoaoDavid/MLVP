from mlvp.antlr.ast.expressions.ColumnReferenceExpression import ColumnReferenceExpression
from mlvp.antlr.ast.expressions.binary import *
from mlvp.antlr.ast.expressions.literal.LiteralExpression import LiteralExpression
from mlvp.antlr.ast.expressions.unary import *
from mlvp.antlr.ast.statements.CreateColumnStatement import CreateColumnStatement


DF = "{df}[\'{col_name}\']"
COL_CREATE = "{new_col} = {expr}\n"

BINARY = "{left} {operator} {right}"
UNARY = "{operator} {value}"


class CodeGenerator:

    def __init__(self, root, out_file, df):
        self.root = root
        self.out_file = out_file
        self.df = df

    def generate(self):
        for statement in self.root.statements:
            if isinstance(statement, CreateColumnStatement):
                expr = self.__expression(statement.expr)
                df_new = DF.format(df=self.df, col_name=statement.name)
                self.out_file.write(COL_CREATE.format(new_col=df_new, expr=expr))

    def __expression(self, expr):
        if isinstance(expr, BinaryExpression):
            left = self.__expression(expr.left)
            right = self.__expression(expr.right)
            return BINARY.format(left=left, operator=str(expr), right=right)

        elif isinstance(expr, UnaryExpression):
            value = self.__expression(expr.value)
            return UNARY.format(operator=str(expr), value=value)

        elif isinstance(expr, LiteralExpression):
            return str(expr.value)

        elif isinstance(expr, ColumnReferenceExpression):
            return DF.format(df=self.df, col_name=expr.name)

        return "unrecognized node"
