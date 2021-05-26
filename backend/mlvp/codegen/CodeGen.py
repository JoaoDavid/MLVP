from mlvp.codegen.Emitter import Emitter
from mlvp.graph.nodes import Node


class CodeGen:

    def __init__(self, name, sorted_nodes):
        self.name = name + ".py"
        self.packages = set()
        self.sorted_nodes = sorted_nodes
        self.out_file = open(self.name, "w")
        self.emitter = Emitter()

    def generate_code(self):
        self.__write_imports()
        for root in self.sorted_nodes:
            self.__write_node(root)

        self.out_file.close()
        final_file = open(self.name, "r")
        file_text = final_file.read()
        final_file.close()
        return file_text

    def __write_imports(self):
        for node in self.sorted_nodes:
            node.import_dependency(self.packages)
        for lib in self.packages:
            self.out_file.write(lib)
        self.out_file.write("\n\n")

    def __write_node(self, node: Node):
        # write current node code to the out file
        node.codegen(self.emitter, self.out_file)
        self.out_file.write("\n")
