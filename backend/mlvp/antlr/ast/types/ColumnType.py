from mlvp.antlr.ast.types.Type import Type


class ColumnType(Type):

    def __init__(self, name):
        super().__init__()
        self.name = name
