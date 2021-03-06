from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.graph.ports import DatasetPort, ClassifierPort
from mlvp.typecheck import *
from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, categorical_last_column

CROSS_VAL_SCORE_CALL = "{score} = cross_val_score({model}, {x}, {y}, cv={cv})\n"


class CrossValidation(Node):

    def __init__(self, data):
        super().__init__(data)
        self.num_folds = data['numberFolds']

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="sklearn.model_selection", class_to_import="cross_val_score"))

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
        out_file.write(CROSS_VAL_SCORE_CALL.format(score=score, model=model_var, x=x, y=y, cv=self.num_folds))
        out_file.write("print(" + score + ")\n")

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        input_ds_port = self.get_port(True, "Dataset")
        input_ds = Dataset(input_ds_port.port_id)

        z3_n_folds = Int(NODE_PROP.format(name="n_folds", node_id=self.node_id))

        features_assertions = no_features_of_type(input_ds_port, "string", input_ds.dataset)

        return [
            # requires
            z3_n_folds == self.num_folds,
            z3_n_folds > 1,
            input_ds.cols >= 2,
            input_ds.rows > 0,
            input_ds.balanced,
            Not(input_ds.time_series)
        ] + features_assertions + categorical_last_column(input_ds_port, input_ds.dataset)
