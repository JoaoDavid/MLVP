from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.TopoSort import TopoSort
from mlvp.statement.DatasetDeclarationStatement import DatasetDeclarationStatement
from mlvp.statement.ModelAccuracyStatement import ModelAccuracyStatement
from mlvp.statement.RandomForestStatement import RandomForestStatement

class CodeGenerator:

    def __init__(self, links, nodes, name):
        self.json_links = links
        self.json_nodes = nodes
        self.name = name + ".py"
        self.outFile = open(self.name, "w+")
        self.emitter = Emitter()
        self.topo_sort = TopoSort(self.json_nodes, self.json_links)

    def __write_imports(self, libraries):
        for lib in libraries:
            self.outFile.write(lib)

    def generate_code(self):
        layers, libraries = self.topo_sort.get_layers()
        self.__write_imports(libraries)
        for i in range(len(layers)):
            for j in range(len(layers[i])):
                self.__write_statements(layers[i][j])
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

    def __write_statements(self, statement):
        curr_count = self.emitter.get_count()
        if isinstance(statement, DatasetDeclarationStatement):
            df_var = "df" + str(curr_count)
            x = "x" + str(curr_count)
            y = "y" + str(curr_count)
            self.emitter.set(statement, (x, y))
            print(df_var)
            self.outFile.write(
                LOAD_CSV.format(var=df_var, pandas_var=PANDAS_VAR, file_name=statement.ds_type.file_name))
        elif isinstance(statement, RandomForestStatement):
            clf_var = "clf" + str(curr_count)
            variables = self.emitter.get(statement.parents[0])
            model_type = statement.model_type
            self.outFile.write(RANDOM_FOREST_INIT.format(var=clf_var, num_trees=model_type.num_trees, criterion=model_type.criterion, max_depth=model_type.max_depth))
            self.outFile.write(MODE_FIT.format(var=clf_var, x=variables[0], y=variables[1]))
        elif isinstance(statement, ModelAccuracyStatement):
            self.outFile.write("")
