from mlvp.datatype.Type import Type


class ModelAccuracy(Type):

    def __init__(self):
        super().__init__()

    def __str__(self):
        return type(self).__name__
