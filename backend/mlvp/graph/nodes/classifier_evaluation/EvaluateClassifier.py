from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.graph.ports import DatasetPort, ClassifierPort
from mlvp.typecheck import *
from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, categorical_last_column


MODEL_PREDICT = "{var} = {clf_var}.predict({x})\n"
ACCURACY_SCORE_CALL = "accuracy_score({y_true}, {y_pred})\n"


class EvaluateClassifier(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="sklearn.metrics", class_to_import="accuracy_score"))

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        y_predicted = "y_predicted" + str(curr_count)
        clf_var, x, y = "", "", ""
        for curr in self.parent_links:
            parent_port = curr.source_port
            if isinstance(parent_port, ClassifierPort):
                clf_var = emitter.get(parent_port)
            elif isinstance(parent_port, DatasetPort):
                x, y = emitter.get(parent_port)
        out_file.write(MODEL_PREDICT.format(var=y_predicted, clf_var=clf_var, x=x))
        score = "score" + str(curr_count)
        out_file.write(score + " = " + ACCURACY_SCORE_CALL.format(y_true=y, y_pred=y_predicted))
        out_file.write("print(" + score + ")\n")

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        input_ds_port = self.get_port(True, "Dataset")
        input_ds = Dataset(input_ds_port.port_id)

        features_assertions = no_features_of_type(input_ds_port, "string", input_ds.dataset)

        return [
            # requires
            input_ds.balanced,
            input_ds.cols >= 2,
            input_ds.rows > 0,
        ] + features_assertions + categorical_last_column(input_ds_port, input_ds.dataset)
