from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.graph.ports import LayerPort, OptimizerPort
from mlvp.typecheck import *

COMPILE = "\t{clf}.compile(loss=\"{loss}\", optimizer={optimizer}, metrics={metrics})\n"
RET = "\treturn {clf}\n"


class Compiler(Node):

    def __init__(self, data):
        super().__init__(data)
        self.loss = data['loss']
        self.metric = data['metric']

    def import_dependency(self, packages):
        pass

    def codegen(self, emitter: Emitter, out_file):
        for curr in self.parent_links:
            parent_port = curr.source_port
            print(parent_port)
            if isinstance(parent_port, LayerPort):
                clf, x = emitter.get(parent_port)
            elif isinstance(parent_port, OptimizerPort):
                optimizer = emitter.get(parent_port)

        out_file.write(COMPILE.format(clf=clf, loss=self.loss, optimizer=optimizer, metrics=[self.metric]))
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
