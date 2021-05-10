from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.graph.ports import DatasetPort, RegressorPort
from mlvp.typecheck import *

MODEL_PREDICT = "{var} = {clf_var}.predict({x})\n"
EXPLAINED_VARIANCE_CALL = "explained_variance_score({y_true}, {y_pred})\n"


class EvaluateRegressor(Node):

    def __init__(self, data):
        super().__init__(data)

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.metrics", class_to_import="explained_variance_score")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        y_predicted = "y_predicted" + str(curr_count)
        clf_var, x, y = "", "", ""
        for curr in self.parent_links:
            parent_port = curr.source_port
            if isinstance(parent_port, RegressorPort):
                clf_var = emitter.get(parent_port)
            elif isinstance(parent_port, DatasetPort):
                x, y = emitter.get(parent_port)
        out_file.write(MODEL_PREDICT.format(var=y_predicted, clf_var=clf_var, x=x))
        score = "score" + str(curr_count)
        out_file.write(score + " = " + EXPLAINED_VARIANCE_CALL.format(y_true=y, y_pred=y_predicted))
        out_file.write("print(" + score + ")\n")

    def data_flow(self, node_columns):
        pass

    def assertions(self, node_columns):
        input_ds_port = self.get_port(True, "Dataset")
        input_ds = Dataset(input_ds_port.port_id)

        return [
            # requires
            input_ds.cols >= 2
        ]
