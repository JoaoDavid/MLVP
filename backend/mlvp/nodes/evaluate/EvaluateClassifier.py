from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.templates.CodeTemplate import MODEL_PREDICT, ACCURACY_SCORE_CALL, FROM_IMPORT
from mlvp.codegen.templates.LibNames import SKLEARN, METRICS, ACCURACY_SCORE
from mlvp.nodes.Node import Node
from mlvp.ports.dataset.DatasetPort import DatasetPort
from mlvp.ports.model.ModelPort import ModelPort
from mlvp.typecheck import Dataset
from z3 import *


class EvaluateClassifier(Node):

    def __init__(self, node_id: str, title: str):
        super().__init__(node_id, title)

    def import_dependency(self):
        return FROM_IMPORT.format(package=SKLEARN + "." + METRICS, class_to_import=ACCURACY_SCORE)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        y_predicted = "y_predicted" + str(curr_count)
        clf_var, x, y = "", "", ""
        for curr in self.parent_links:
            parent_port = curr.source_port
            if isinstance(parent_port, ModelPort):
                clf_var = emitter.get(parent_port)
            elif isinstance(parent_port, DatasetPort):
                x, y = emitter.get(parent_port)
        out_file.write(MODEL_PREDICT.format(var=y_predicted, clf_var=clf_var, x=x))
        score = "score" + str(curr_count)
        out_file.write(score + " = " + ACCURACY_SCORE_CALL.format(y_true=y, y_pred=y_predicted))
        out_file.write("print(" + score + ")\n")

    def assertions(self):
        id_input_ds = self.get_port(True, "Dataset").port_id
        input_ds = Dataset(id_input_ds)

        return [
            # requires
            input_ds.balanced,
            input_ds.cols >= 2
        ]
