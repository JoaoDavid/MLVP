from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.TopoSort import TopoSort
from mlvp.statement import Statement
from mlvp.statement import DatasetDeclarationStatement
from mlvp.statement import ModelAccuracyStatement
from mlvp.statement import RandomForestStatement
from mlvp.statement import ModelTrainStatement
from mlvp.statement import SplitDatasetStatement
from mlvp.statement import ParentLink, Port


class CodeGenerator:

    def __init__(self, links, nodes, name, num_tiers):
        self.json_links = links
        self.json_nodes = nodes
        self.name = name + ".py"
        self.out_file = open(self.name, "w+")
        self.emitter = Emitter()
        self.topo_sort = TopoSort(self.json_nodes, self.json_links, num_tiers)

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

    def __write_statements(self, statement: Statement):
        curr_count = self.emitter.get_count()
        parent_links = statement.parent_links
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
        if isinstance(statement, SplitDatasetStatement):
            parent = parent_links[0].parent_statement
            if isinstance(parent, DatasetDeclarationStatement):
                x_y = self.emitter.get(parent)
            print(statement)
            print(statement.node_id)
            print(parent_links[0])
            print(parent)
            x_train = x_y[0] + "_train" + str(curr_count)
            y_train = x_y[1] + "_train" + str(curr_count)
            x_test = x_y[0] + "_test" + str(curr_count)
            y_test = x_y[1] + "_test" + str(curr_count)
            self.out_file.write(
                TRAIN_TEST_SPLIT_CALL.format(x_train=x_train, x_test=x_test, y_train=y_train, y_test=y_test, x=x_y[0],
                                             y=x_y[1], test_size=statement.test_size, train_size=statement.train_size,
                                             shuffle=statement.shuffle))
            self.emitter.set(statement, (x_train, y_train, x_test, y_test))
        elif isinstance(statement, RandomForestStatement):
            clf_var = "clf" + str(curr_count)
            self.emitter.set(statement, clf_var)
            parent = statement.parent_links[0].parent_statement
            x, y = "", ""
            if isinstance(parent, DatasetDeclarationStatement):
                x_y = self.emitter.get(parent)
                x = x_y[0]
                y = x_y[1]
            elif isinstance(parent, SplitDatasetStatement):
                x, y = self.get_split_dataset_variables(parent_links[0])
            model_type = statement.model_type
            self.out_file.write(
                RANDOM_FOREST_INIT.format(var=clf_var, num_trees=model_type.num_trees, criterion=model_type.criterion,
                                          max_depth=model_type.max_depth))
            self.out_file.write(MODEL_FIT.format(var=clf_var, x=x, y=y))
        elif isinstance(statement, ModelAccuracyStatement):
            y_predicted = "y_predicted" + str(curr_count)
            clf_var, x, y = "", "", ""
            for curr in parent_links:
                parent = curr.parent_statement
                if isinstance(parent, ModelTrainStatement):
                    clf_var = self.emitter.get(parent)
                elif isinstance(parent, DatasetDeclarationStatement):
                    x_y = self.emitter.get(parent)
                    x = x_y[0]
                    y = x_y[1]
                elif isinstance(parent, SplitDatasetStatement):
                    x, y = self.get_split_dataset_variables(curr)
            self.out_file.write(MODEL_PREDICT.format(var=y_predicted, clf_var=clf_var, x=x))
            score = "score" + str(curr_count)
            self.out_file.write(score + " = " + ACCURACY_SCORE_CALL.format(y_true=y, y_pred=y_predicted))
            self.out_file.write("print("+score+")\n")
        self.out_file.write("\n")

    def get_split_dataset_variables(self, parent_link: ParentLink):
        xytrain_xytest = self.emitter.get(parent_link.parent_statement)
        print(parent_link.parent_statement.ports)
        print(parent_link.parent_statement.ports[parent_link.parent_source_port])
        parent_port = parent_link.parent_statement.ports[parent_link.parent_source_port]
        if parent_port.name == 'Train Dataset':
            print('Train Dataset')
            return xytrain_xytest[0], xytrain_xytest[1]
        elif parent_port.name == 'Test Dataset':
            print('Test Dataset')
            return xytrain_xytest[2], xytrain_xytest[3]
        print('here')