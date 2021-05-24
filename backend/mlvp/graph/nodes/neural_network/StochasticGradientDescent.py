from mlvp.codegen import *
from mlvp.graph.nodes.Node import *

INIT = "{optimizer} = SGD()\n"


class StochasticGradientDescent(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="keras.optimizers", class_to_import="SGD"))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        optimizer = "optimizer" + str(curr_count)

        out_file.write(INIT.format(optimizer=optimizer))

        out_optimizer = self.get_port(False, "Optimizer")
        emitter.set(out_optimizer, optimizer)

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        return []
