from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

COMPILE = "{clf}.compile(loss={loss}, optimizer={optimizer}, metrics={metrics})\n"
RET = "return {clf}\n"

class Compiler(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self, packages):
        pass

    def codegen(self, emitter: Emitter, out_file):
        in_layer_port = self.parent_links[0].source_port
        in_optimizer_port = self.parent_links[1].source_port
        clf = emitter.get(in_layer_port)
        optimizer = emitter.get(in_optimizer_port)

        out_file.write(COMPILE.format(clf=clf, loss='\'categorical_crossentropy\'', optimizer=optimizer, metrics=["accuracy"]))
        out_file.write(RET.format(clf=clf))

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        layer_port = self.get_port(True, "Layer")
        optimizer_port = self.get_port(True, "Optimizer")
        z3_in_layers = Int(PORT_PROP.format(id_port=layer_port.port_id, name="n_layers"))


        for parent_link in self.parent_links:
            print(parent_link.target_port == layer_port)

        layer_assertions = []
        if self.all_input_ports_linked():
            layer_assertions = [
                z3_in_layers == layer_port.num_layers,
                z3_in_layers > 0,
            ]

        return [
            # requires
        ] + layer_assertions
