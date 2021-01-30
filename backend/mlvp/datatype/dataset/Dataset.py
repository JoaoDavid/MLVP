from mlvp.datatype.PortType import Type


class Dataset(Type):

    def __init__(self, name: str, in_port: bool):
        super().__init__(name, in_port)
