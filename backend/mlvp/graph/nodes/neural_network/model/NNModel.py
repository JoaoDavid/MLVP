from mlvp.graph.nodes.Node import *


class NNModel(Node):

    @abstractmethod
    def __init__(self, data):
        super().__init__(data)
        pass

    def import_dependency(self, packages):
        pass

    def codegen(self, emitter, out_file):
        pass

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        pass
