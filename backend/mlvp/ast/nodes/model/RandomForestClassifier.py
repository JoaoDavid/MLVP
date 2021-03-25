from mlvp.codegen import *
from mlvp.ast.nodes.Node import Node
from mlvp.typecheck import *

RANDOM_FOREST_INIT = "{var} = RandomForestClassifier(n_estimators={num_trees}, criterion=\"{criterion}\", max_depth={max_depth})\n"
MODEL_FIT = "{var}.fit({x}, {y})\n"


class RandomForestClassifier(Node):

    def __init__(self, data):
        super().__init__(data)
        self.num_trees = data['numTrees']
        self.criterion = data['criterion']
        self.max_depth = data['maxDepth']

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.ensemble", class_to_import="RandomForestClassifier")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        clf_var = "clf" + str(curr_count)
        out_clf = self.get_port(False, "Classifier")
        emitter.set(out_clf, clf_var)
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        out_file.write(RANDOM_FOREST_INIT.format(var=clf_var, num_trees=self.num_trees, criterion=self.criterion,
                                                 max_depth=self.max_depth))
        out_file.write(MODEL_FIT.format(var=clf_var, x=x, y=y))

    def assertions(self):
        id_input = self.get_port(True, "Dataset").port_id
        input_ds = Dataset(id_input)
        z3_n_trees = Int("node" + SEP + "n-trees")
        z3_max_depth = Int("node" + SEP + "max-depth")
        max_depth = -1 if self.max_depth == "None" else self.max_depth

        return [
            # requires
            z3_n_trees == self.num_trees,
            z3_n_trees > 0,
            z3_max_depth == max_depth,
            Or(z3_max_depth > 0, z3_max_depth == -1),
            input_ds.balanced,
            input_ds.rows > 0,
            input_ds.cols > IntVal(1)
        ]