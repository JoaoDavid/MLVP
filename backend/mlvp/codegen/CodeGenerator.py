from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.TopoSort import TopoSort
from mlvp.statement.DatasetDeclarationStatement import DatasetDeclarationStatement
from mlvp.statement.ModelAccuracyStatement import ModelAccuracyStatement
from mlvp.statement.RandomForestStatement import RandomForestStatement
from mlvp.statement.ModelTrainStatement import ModelTrainStatement


class CodeGenerator:

    def __init__(self, links, nodes, name):
        self.json_links = links
        self.json_nodes = nodes
        self.name = name + ".py"
        self.out_file = open(self.name, "w+")
        self.emitter = Emitter()
        self.topo_sort = TopoSort(self.json_nodes, self.json_links)

    def __write_imports(self, libraries):
        for lib in libraries:
            self.out_file.write(lib)
        self.out_file.write("\n\n")

    def generate_code(self):
        layers, libraries = self.topo_sort.get_layers()
        self.__write_imports(libraries)
        for i in range(len(layers)):
            for j in range(len(layers[i])):
                self.__write_statements(layers[i][j])

        self.out_file.close()
        final_file = open(self.name, "r")
        file_text = final_file.read()
        final_file.close()
        return file_text

    def __write_statements(self, statement):
        curr_count = self.emitter.get_count()
        if isinstance(statement, DatasetDeclarationStatement):
            df_var = "df" + str(curr_count)
            x = "x" + str(curr_count)
            y = "y" + str(curr_count)
            self.emitter.set(statement, (x, y))
            print(df_var)
            self.out_file.write(
                LOAD_CSV.format(var=df_var, pandas_var=PANDAS_VAR, file_name=statement.ds_type.file_name))
            self.out_file.write(FEATURES.format(x=x, var=df_var, target=statement.ds_type.target))
            self.out_file.write(TARGET.format(y=y, var=df_var, target=statement.ds_type.target))

        elif isinstance(statement, RandomForestStatement):
            clf_var = "clf" + str(curr_count)
            self.emitter.set(statement, clf_var)
            variables = self.emitter.get(statement.parents[0])
            model_type = statement.model_type
            self.out_file.write(
                RANDOM_FOREST_INIT.format(var=clf_var, num_trees=model_type.num_trees, criterion=model_type.criterion,
                                          max_depth=model_type.max_depth))
            self.out_file.write(MODEL_FIT.format(var=clf_var, x=variables[0], y=variables[1]))
        elif isinstance(statement, ModelAccuracyStatement):
            y_predicted = "y_predicted" + str(curr_count)
            clf_var, x_y = "", ("", "")
            for curr in statement.parents:
                if isinstance(curr, ModelTrainStatement):
                    clf_var = self.emitter.get(curr)
                elif isinstance(curr, DatasetDeclarationStatement):
                    x_y = self.emitter.get(curr)
            self.out_file.write(MODEL_PREDICT.format(var=y_predicted, clf_var=clf_var, x=x_y[0]))
            series_list = x_y[1] + "_list" + str(curr_count)
            counter = "counter" + str(curr_count)
            y_len = "len("+series_list+")"
            self.out_file.write(series_list + " = " + SERIES_TO_LIST.format(series_var=x_y[1]))
            self.out_file.write(counter + " = " + str(0) + "\n")
            self.out_file.write("for i in range(" + y_len + "):\n")
            self.out_file.write(" " * 4 + "if " + series_list + "[i] == " + y_predicted + "[i]:\n")
            self.out_file.write(" " * 8 + counter + " += 1\n")
            self.out_file.write(PRINT.format(content=counter + "/" + y_len + " * 100"))
        self.out_file.write("\n")