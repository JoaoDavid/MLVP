from mlvp.antlr.ast.types.NumberType import NumberType


class FloatType(NumberType):

    def __init__(self):
        super().__init__()

    def __str__(self):
        return "float"
