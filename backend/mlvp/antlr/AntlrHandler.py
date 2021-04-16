from antlr4 import *

from .MyErrorListener import MyErrorListener
from .gen.GrammarLexer import GrammarLexer
from .gen.GrammarParser import GrammarParser
from .TreeVisitor import TreeVisitor


def build_ast(text):
    input_stream = InputStream(text)
    lexer = GrammarLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = GrammarParser(stream)

    parser.removeErrorListeners()
    error_listener = MyErrorListener()
    parser.addErrorListener(error_listener)

    parser_tree = parser.program()
    syntax_errors = error_listener.syntax_errors
    ast = None

    if len(error_listener.syntax_errors) == 0:
        tree_visitor = TreeVisitor()
        ast = tree_visitor.visit_tree(parser_tree)
    return ast, syntax_errors
