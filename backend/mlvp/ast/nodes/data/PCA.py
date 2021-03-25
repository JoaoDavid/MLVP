from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.templates.CodeTemplate import PCA_INIT, FIT_TRANSFORM_CALL, FROM_IMPORT
from mlvp.codegen.templates.LibNames import SKLEARN, DECOMPOSITION
from mlvp.ast.nodes.Node import Node
from mlvp.typecheck import *


class PCA(Node):

    def __init__(self, data):
        super().__init__(data)
        self.random_state = data['randomState']
        self.num_components = data['numComponents']

    def import_dependency(self):
        return FROM_IMPORT.format(package=SKLEARN + "." + DECOMPOSITION, class_to_import=PCA)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        pca_var = "pca" + str(curr_count)
        x_pca = "x_pca" + str(curr_count)
        # y_pca = "y_pca" + str(curr_count)
        out_file.write(PCA_INIT.format(pca_var=pca_var, random_state=self.random_state, n_components=self.num_components))
        out_file.write(FIT_TRANSFORM_CALL.format(x_pca=x_pca, pca_var=pca_var, x=x))
        out_ds = self.get_port(False, "Reduced Dataset")
        emitter.set(out_ds, (x_pca, y))

    def assertions(self):
        id_input = self.get_port(True, "Dataset").port_id
        id_output = self.get_port(False, "Reduced Dataset").port_id
        input_ds = Dataset(id_input)
        output_ds = Dataset(id_output)
        z3_n_components = Int("node" + SEP + "n-components")

        return [
            # requires
            z3_n_components == self.num_components,
            z3_n_components < input_ds.cols,
            z3_n_components > 0,
            # ensures
            output_ds.cols == z3_n_components + 1,
            output_ds.rows == input_ds.rows,
            output_ds.n_labels == input_ds.n_labels,
            output_ds.max_label_count == input_ds.max_label_count,
            output_ds.min_label_count == input_ds.min_label_count,
            input_ds.balanced == output_ds.balanced,
        ]
