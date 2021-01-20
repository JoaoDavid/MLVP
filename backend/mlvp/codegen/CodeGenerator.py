from mlvp.codegen.CodeTemplate import *
from mlvp.codegen.TopoSort import get_layers
from mlvp.datatype.Csv import Csv
from mlvp.datatype.ModelAccuracy import ModelAccuracy
from mlvp.datatype.RandomForest import RandomForest


class CodeGenerator:

    def __init__(self, links, nodes, name):
        self.json_links = links
        self.json_nodes = nodes
        self.name = name + ".py"
        self.outFile = open(self.name, "w+")
        self.counter = 0

    def __write_imports(self):
        self.outFile.write(IMPORT_LIB.format(lib_name="pandas", lib_var="pd"))

    def generate_code(self):
        self.__write_imports()
        layers = get_layers(self.json_nodes)
        for i in range(len(layers)):
            for j in range(len(layers[i])):
                self.__write_node_statements(layers[i][j])
                print(layers[i][j])
                # chamar metodo que geral que vai posteriormente chamar o metodo respectivo ao node em causa, vendo os seus links

        # some code
        self.outFile.close()
        finalFile = open(self.name, "r")
        fileText = finalFile.read()
        finalFile.close()
        return fileText

    def __write_node_statements(self, node_type):
        if isinstance(node_type, Csv):
            self.outFile.write("batata")
        elif isinstance(node_type, RandomForest):
            self.outFile.write("cenoura")
        elif isinstance(node_type, ModelAccuracy):
            self.outFile.write("alface")
