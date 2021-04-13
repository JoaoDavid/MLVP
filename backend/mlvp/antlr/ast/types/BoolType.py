from mlvp.antlr.ast.types.Type import Type


class BoolType(Type):

    def __init__(self):
        super().__init__()

    def __str__(self):
        return "bool"
