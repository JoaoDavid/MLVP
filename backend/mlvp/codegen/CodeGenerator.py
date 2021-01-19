from mlvp.codegen.CodeTemplate import *
from mlvp.codegen.TopoSort import get_layers


class CodeGenerator:

    def __init__(self, links, nodes, name):
        self.links = links
        self.nodes = nodes
        self.name = name + ".py"
        self.outFile = open(self.name, "w+")
        self.counter = 0

    def __write_imports(self):
        self.outFile.write(IMPORT_LIB.format(lib_name="pandas", lib_var="pd"))

    def generate_code(self):
        self.__write_imports()
        layers = get_layers(self.nodes)
        for i in range(len(layers)):
            for j in range(len(layers[i])):
                print(layers[i][j])

        # some code
        self.outFile.close()
        finalFile = open(self.name, "r")
        fileText = finalFile.read()
        finalFile.close()
        return fileText
