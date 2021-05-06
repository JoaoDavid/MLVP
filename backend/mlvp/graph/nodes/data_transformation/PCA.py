from mlvp.graph.nodes.AssertionsHelper import no_features_of_type
from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

PCA_INIT = "{pca_var} = PCA(random_state={random_state}, n_components={n_components})\n"
FIT_TRANSFORM_CALL = "{numpy_array} = {pca_var}.fit_transform({x})\n"
CONVERT_TO_DF = "{x_pca} = pd.DataFrame({numpy_array}, columns={columns})\n"


class PCA(Node):

    def __init__(self, data):
        super().__init__(data)
        self.random_state = data['randomState']
        self.num_components = data['numComponents']
        # TODO receber do front-end os nomes das novas colunas
        self.column_names = ['col' + str(i) for i in range(self.num_components)]

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.decomposition", class_to_import="PCA")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        pca_var = "pca" + str(curr_count)
        numpy_array = "numpy_array" + str(curr_count)
        x_pca = "x_pca" + str(curr_count)
        # y_pca = "y_pca" + str(curr_count)
        out_file.write(PCA_INIT.format(pca_var=pca_var, random_state=self.random_state, n_components=self.num_components))
        out_file.write(FIT_TRANSFORM_CALL.format(numpy_array=numpy_array, pca_var=pca_var, x=x))
        out_file.write(CONVERT_TO_DF.format(x_pca=x_pca, numpy_array=numpy_array, columns=self.column_names))
        out_ds = self.get_port(False, "Reduced Dataset")
        emitter.set(out_ds, (x_pca, y))

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Reduced Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)
        z3_n_components = Int(NODE_PROP.format(name="n_components", node_id=self.node_id))

        this_node_columns = {}
        for i in range(1, self.num_components + 1):
            this_node_columns["V" + str(i)] = "float"

        if len(input_port.columns) > 0:
            last = list(input_port.columns.items())[-1]
            this_node_columns[last[0]] = last[1]
        node_columns[self.node_id] = this_node_columns

        # print(self.column_names)
        # for curr_name in self.column_names:
        #     columns[curr_name] = "float"
        output_port.columns = this_node_columns

        features_assertions = no_features_of_type(input_port, "string", input_ds.dataset)

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
        ] + features_assertions