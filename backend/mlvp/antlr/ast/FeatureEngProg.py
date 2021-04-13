from mlvp.antlr.ast.Node import Node


class FeatureEngProg(Node):

    def __init__(self, statements):
        self.statements = statements
