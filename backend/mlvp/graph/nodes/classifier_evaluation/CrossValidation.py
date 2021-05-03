from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.graph.ports import DatasetPort, ClassifierPort
from mlvp.typecheck import *

CROSS_VAL_SCORE_CALL = "{score} = cross_val_score({model}, {x}, {y}, cv={cv})\n"


class CrossValidation(Node):

    def __init__(self, data):
        super().__init__(data)
        self.num_folds = data['numberFolds']

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.model_selection", class_to_import="cross_val_score")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        score = "score" + str(curr_count)
        model_var, x, y = "", "", ""
        for curr in self.parent_links:
            parent_port = curr.source_port
            if isinstance(parent_port, ClassifierPort):
                model_var = emitter.get(parent_port)
            elif isinstance(parent_port, DatasetPort):
                x, y = emitter.get(parent_port)
        out_file.write(CROSS_VAL_SCORE_CALL.format(score=score, model=model_var, x=x, y=y, cv=self.number_folds))
        out_file.write("print(" + score + ")\n")

    def assertions(self, node_columns):
        id_input_ds = self.get_port(True, "Dataset").port_id
        input_ds = Dataset(id_input_ds)

        z3_n_folds = Int(NODE_PROP.format(name="n_folds", node_id=self.node_id))

        return [
            # requires
            z3_n_folds == self.num_folds,
            z3_n_folds > 1,
            input_ds.balanced,
            input_ds.cols > 1,
            Not(input_ds.time_series)
        ]
