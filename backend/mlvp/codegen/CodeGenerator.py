from mlvp.codegen.CodeTemplate import *
from mlvp.codegen.LibNames import *
from mlvp.codegen.Emitter import Emitter
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
        self.emitter = Emitter()

    def __write_imports(self):
        self.outFile.write(IMPORT_LIB.format(lib_name=PANDAS, lib_var=PANDAS_VAR))

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

    def __get_var_name(self, var_name):
        return var_name + str(self.emitter.get_count())

    def __write_node_statements(self, node_type):
        if isinstance(node_type, Csv):
            df_var = self.__get_var_name("df")
            print(df_var)
            self.outFile.write(LOAD_CSV.format(var=df_var, pandas_var=PANDAS_VAR, file_name=node_type.file_name))
        elif isinstance(node_type, RandomForest):
            self.outFile.write("")
        elif isinstance(node_type, ModelAccuracy):
            self.outFile.write("")
