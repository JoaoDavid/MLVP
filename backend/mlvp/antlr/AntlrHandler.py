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

    tree = parser.program()
    print(error_listener.list_errors)

    if len(error_listener.list_errors) == 0:
        tree_visitor = TreeVisitor()
        ast = tree_visitor.visit_tree(tree)
        return ast
    else:
        print("Found errors when creating ParserTree")
        return None
