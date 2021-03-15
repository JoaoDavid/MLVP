from mlvp.codegen.templates.CodeTemplate import *
from mlvp.codegen.templates.LibNames import *
from mlvp.codegen.Emitter import Emitter
from mlvp.ports import DatasetPort, ModelPort
from mlvp.nodes import Node
from mlvp.nodes import ImportFromCSV
from mlvp.nodes import ModelAccuracy
from mlvp.nodes import RandomForestClassifier
from mlvp.nodes import SplitDataset
from mlvp.nodes import Oversampling, UnderSampling
from mlvp.nodes import PCA
from mlvp.nodes import CrossValidation


class CodeGen:

    def __init__(self, name, libraries, roots):
        self.name = name + ".py"
        self.libraries = libraries
        self.roots = roots
        self.out_file = open(self.name, "w+")
        self.emitter = Emitter()

    def __write_imports(self):
        for lib in self.libraries:
            self.out_file.write(lib)
        self.out_file.write("\n\n")

    def generate_code(self):
        self.__write_imports()
        for root in self.roots:
            self.__write_nodes(root)

        self.out_file.close()
        final_file = open(self.name, "r")
        file_text = final_file.read()
        final_file.close()
        return file_text

    def __write_nodes(self, node: Node):
        if not node.visited:
            node.visited = True
            for parent_link in node.parent_links:
                self.__write_nodes(parent_link.parent_node)
            # parents are all visited
            curr_count = self.emitter.get_count()
            parent_links = node.parent_links
            print(node.__class__.__name__)
            if isinstance(node, ImportFromCSV):
                df_var = "df" + str(curr_count)
                x = "x" + str(curr_count)
                y = "y" + str(curr_count)
                out_ds = node.get_port(False, "Dataset")
                self.emitter.set(out_ds, (x, y))
                self.out_file.write(
                    LOAD_CSV.format(var=df_var, pandas_var=PANDAS_VAR, file_name=node.file_name))
                self.out_file.write(FEATURES.format(x=x, var=df_var, target=node.target))
                self.out_file.write(TARGET.format(y=y, var=df_var, target=node.target))
            elif isinstance(node, SplitDataset):
                parent_port = parent_links[0].source_port
                x, y = self.emitter.get(parent_port)
                x_train = x + "_train" + str(curr_count)
                y_train = y + "_train" + str(curr_count)
                x_test = x + "_test" + str(curr_count)
                y_test = y + "_test" + str(curr_count)
                self.out_file.write(
                    TRAIN_TEST_SPLIT_CALL.format(x_train=x_train, x_test=x_test, y_train=y_train, y_test=y_test, x=x,
                                                 y=y, test_size=node.test_size, train_size=node.train_size,
                                                 shuffle=node.shuffle))
                out_train_ds = node.get_port(False, "Train Dataset")
                out_test_ds = node.get_port(False, "Test Dataset")
                self.emitter.set(out_train_ds, (x_train, y_train))
                self.emitter.set(out_test_ds, (x_test, y_test))
            elif isinstance(node, Oversampling):
                parent_port = parent_links[0].source_port
                x, y = self.emitter.get(parent_port)
                ros_var = "ros" + str(curr_count)
                x_ros_res = "x_ros_res" + str(curr_count)
                y_ros_res = "y_ros_res" + str(curr_count)
                self.out_file.write(SAMPLER_INIT.format(var=ros_var, sampler=RANDOM_OVERSAMPLER, random_state=node.random_state))
                self.out_file.write(FIT_RESAMPLE.format(x_res=x_ros_res, y_res=y_ros_res, var=ros_var, x=x, y=y))
                out_ds = node.get_port(False, "Balanced Dataset")
                self.emitter.set(out_ds, (x_ros_res, y_ros_res))
            elif isinstance(node, UnderSampling):
                parent_port = parent_links[0].source_port
                x, y = self.emitter.get(parent_port)
                rus_var = "rus" + str(curr_count)
                x_rus_res = "x_rus_res" + str(curr_count)
                y_rus_res = "y_rus_res" + str(curr_count)
                self.out_file.write(SAMPLER_INIT.format(var=rus_var, sampler=RANDOM_UNDERSAMPLER, random_state=node.random_state))
                self.out_file.write(FIT_RESAMPLE.format(x_res=x_rus_res, y_res=y_rus_res, var=rus_var, x=x, y=y))
                out_ds = node.get_port(False, "Balanced Dataset")
                self.emitter.set(out_ds, (x_rus_res, y_rus_res))
            elif isinstance(node, PCA):
                parent_port = parent_links[0].source_port
                x, y = self.emitter.get(parent_port)
                pca_var = "pca" + str(curr_count)
                x_pca = "x_pca" + str(curr_count)
                # y_pca = "y_pca" + str(curr_count)
                self.out_file.write(PCA_INIT.format(pca_var=pca_var, random_state=node.random_state))
                self.out_file.write(FIT_TRANSFORM_CALL.format(x_pca=x_pca, pca_var=pca_var, x=x))
                out_ds = node.get_port(False, "Reduced Dataset")
                self.emitter.set(out_ds, (x_pca, y))
            elif isinstance(node, RandomForestClassifier):
                clf_var = "clf" + str(curr_count)
                out_clf = node.get_port(False, "Classifier")
                self.emitter.set(out_clf, clf_var)
                parent_port = parent_links[0].source_port
                x, y = self.emitter.get(parent_port)
                self.out_file.write(
                    RANDOM_FOREST_INIT.format(var=clf_var, num_trees=node.num_trees, criterion=node.criterion,
                                              max_depth=node.max_depth))
                self.out_file.write(MODEL_FIT.format(var=clf_var, x=x, y=y))
            elif isinstance(node, ModelAccuracy):
                y_predicted = "y_predicted" + str(curr_count)
                clf_var, x, y = "", "", ""
                for curr in parent_links:
                    parent_port = curr.source_port
                    if isinstance(parent_port, ModelPort):
                        clf_var = self.emitter.get(parent_port)
                    elif isinstance(parent_port, DatasetPort):
                        x, y = self.emitter.get(parent_port)
                self.out_file.write(MODEL_PREDICT.format(var=y_predicted, clf_var=clf_var, x=x))
                score = "score" + str(curr_count)
                self.out_file.write(score + " = " + ACCURACY_SCORE_CALL.format(y_true=y, y_pred=y_predicted))
                self.out_file.write("print("+score+")\n")
            elif isinstance(node, CrossValidation):
                score = "score" + str(curr_count)
                model_var, x, y = "", "", ""
                for curr in parent_links:
                    parent_port = curr.source_port
                    if isinstance(parent_port, ModelPort):
                        model_var = self.emitter.get(parent_port)
                    elif isinstance(parent_port, DatasetPort):
                        x, y = self.emitter.get(parent_port)
                self.out_file.write(CROSS_VAL_SCORE_CALL.format(score=score, model=model_var, x=x, y=y, cv=node.number_folds))
                self.out_file.write("print("+score+")\n")
            self.out_file.write("\n")
            for child in node.children:
                self.__write_nodes(child)
