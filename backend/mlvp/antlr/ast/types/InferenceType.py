from mlvp.antlr.ast.types.Type import Type


class InferenceType(Type):

    def __init__(self, name):
        super().__init__()
        self.name = name
