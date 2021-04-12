from mlvp.antlr.ast.types.NumberType import NumberType


class IntType(NumberType):

    def __init__(self):
        super().__init__()

    def __str__(self):
        return "int"

    def __repr__(self):
        return "int"
