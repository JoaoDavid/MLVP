from antlr4 import *
from .gen.GrammarLexer import *
from .gen.GrammarParser import *


class TreeVisitor:

    def visit_tree(self, ctx):
        for child in ctx.children:
            print(child)
