from antlr4 import *

from mlvp.antlr.ValidatorAST import ValidatorAST
from .gen.GrammarLexer import GrammarLexer
from .gen.GrammarParser import GrammarParser
from .TreeVisitor import TreeVisitor


def parse_text(text, dataset):
    input_stream = InputStream(text)
    lexer = GrammarLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = GrammarParser(stream)
    tree = parser.program()

    tree_visitor = TreeVisitor()
    ast = tree_visitor.visit_tree(tree)

    ast_validator = ValidatorAST(ast, dataset)
    return ast_validator.validate_ast()
