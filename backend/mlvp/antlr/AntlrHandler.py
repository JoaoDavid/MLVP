from antlr4 import *
from .gen.GrammarLexer import GrammarLexer
from .gen.GrammarParser import GrammarParser
from .TreeVisitor import TreeVisitor


def parse_text(text):
    input_stream = InputStream(text)
    lexer = GrammarLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = GrammarParser(stream)
    tree = parser.program()

    tree_visitor = TreeVisitor()
    print(type(tree))
    tree_visitor.visit_tree(tree)
    print("tree " + str(tree))
