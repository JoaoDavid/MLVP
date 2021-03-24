from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.templates.CodeTemplate import CROSS_VAL_SCORE_CALL
from mlvp.nodes.Node import Node
from mlvp.ports.dataset.DatasetPort import DatasetPort
from mlvp.ports.model.ModelPort import ModelPort
from mlvp.typecheck import Dataset, SEP
from z3 import *


class CrossValidation(Node):

    def __init__(self, node_id: str, title: str, num_folds: int):
        super().__init__(node_id, title)
        self.num_folds = num_folds

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        score = "score" + str(curr_count)
        model_var, x, y = "", "", ""
        for curr in self.parent_links:
            parent_port = curr.source_port
            if isinstance(parent_port, ModelPort):
                model_var = emitter.get(parent_port)
            elif isinstance(parent_port, DatasetPort):
                x, y = emitter.get(parent_port)
        out_file.write(CROSS_VAL_SCORE_CALL.format(score=score, model=model_var, x=x, y=y, cv=self.number_folds))
        out_file.write("print(" + score + ")\n")

    def type_check(self):
        id_input_ds = self.get_port(True, "Dataset").port_id
        node_assertions = self.assertions(id_input_ds)
        return node_assertions

    def assertions(self, id_input_ds):
        input_ds = Dataset(id_input_ds)

        z3_n_folds = Int("node" + SEP + "n-folds")

        return [
            # requires
            z3_n_folds == self.num_folds,
            z3_n_folds > 1,
            input_ds.balanced,
            input_ds.cols > 1
        ]
