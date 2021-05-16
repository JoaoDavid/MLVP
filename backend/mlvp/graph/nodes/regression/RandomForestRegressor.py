from mlvp.graph.nodes.AssertionsHelper import no_features_of_type, continuous_last_column
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

INIT = "{reg} = RandomForestRegressor(n_estimators={num_trees}, criterion=\"{criterion}\", max_depth={max_depth})\n"
FIT = "{reg}.fit({x}, {y})\n"


class RandomForestRegressor(Node):

    def __init__(self, data):
        super().__init__(data)
        self.num_trees = data['numTrees']
        self.criterion = data['criterion']
        self.max_depth = data['maxDepth']

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.ensemble", class_to_import="RandomForestRegressor")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        reg = "reg" + str(curr_count)
        x, y = emitter.get(parent_port)

        out_file.write(INIT.format(reg=reg, num_trees=self.num_trees, criterion=self.criterion,
                                                 max_depth=self.max_depth))
        out_file.write(FIT.format(reg=reg, x=x, y=y))

        out_reg = self.get_port(False, "Regressor")
        emitter.set(out_reg, reg)

    def data_flow(self, node_columns):
        pass

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        input_ds = Dataset(input_port.port_id)

        z3_n_trees = Int(NODE_PROP.format(name="n_trees", node_id=self.node_id))
        z3_max_depth = Int(NODE_PROP.format(name="max_depth", node_id=self.node_id))
        max_depth = -1 if self.max_depth == "None" else self.max_depth

        features_assertions = no_features_of_type(input_port, "string", input_ds.dataset)

        return [
            # requires
            z3_n_trees == self.num_trees,
            z3_n_trees > 0,
            z3_max_depth == max_depth,
            Or(z3_max_depth > 0, z3_max_depth == -1),
            input_ds.rows > 0,
            input_ds.cols > 1
        ] + features_assertions + continuous_last_column(input_port, input_ds.dataset)
