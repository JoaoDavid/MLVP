# Generated from Grammar.g4 by ANTLR 4.9.2
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .GrammarParser import GrammarParser
else:
    from GrammarParser import GrammarParser

# This class defines a complete listener for a parse tree produced by GrammarParser.
class GrammarListener(ParseTreeListener):

    # Enter a parse tree produced by GrammarParser#program.
    def enterProgram(self, ctx:GrammarParser.ProgramContext):
        pass

    # Exit a parse tree produced by GrammarParser#program.
    def exitProgram(self, ctx:GrammarParser.ProgramContext):
        pass


    # Enter a parse tree produced by GrammarParser#statement.
    def enterStatement(self, ctx:GrammarParser.StatementContext):
        pass

    # Exit a parse tree produced by GrammarParser#statement.
    def exitStatement(self, ctx:GrammarParser.StatementContext):
        pass


    # Enter a parse tree produced by GrammarParser#create_col_stat.
    def enterCreate_col_stat(self, ctx:GrammarParser.Create_col_statContext):
        pass

    # Exit a parse tree produced by GrammarParser#create_col_stat.
    def exitCreate_col_stat(self, ctx:GrammarParser.Create_col_statContext):
        pass


    # Enter a parse tree produced by GrammarParser#expr.
    def enterExpr(self, ctx:GrammarParser.ExprContext):
        pass

    # Exit a parse tree produced by GrammarParser#expr.
    def exitExpr(self, ctx:GrammarParser.ExprContext):
        pass


    # Enter a parse tree produced by GrammarParser#unary_ope.
    def enterUnary_ope(self, ctx:GrammarParser.Unary_opeContext):
        pass

    # Exit a parse tree produced by GrammarParser#unary_ope.
    def exitUnary_ope(self, ctx:GrammarParser.Unary_opeContext):
        pass



del GrammarParser