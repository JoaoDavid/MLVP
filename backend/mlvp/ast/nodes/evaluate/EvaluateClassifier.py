from mlvp.codegen import *
from mlvp.ast.nodes.Node import *
from mlvp.ast.ports import DatasetPort, ClassifierPort
from mlvp.typecheck import *

MODEL_PREDICT = "{var} = {clf_var}.predict({x})\n"
ACCURACY_SCORE_CALL = "accuracy_score({y_true}, {y_pred})\n"


class EvaluateClassifier(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.metrics", class_to_import="accuracy_score")

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

    def assertions(self, node_columns):
        id_input_ds = self.get_port(True, "Dataset").port_id
        input_ds = Dataset(id_input_ds)

        return [
            # requires
            input_ds.balanced,
            input_ds.cols >= 2
        ]
