from mlvp.codegen import *
from mlvp.ast.nodes.Node import *
from mlvp.typecheck import *

SAMPLER_INIT = "{var} = {sampler}(random_state={random_state})\n"
FIT_RESAMPLE = "{x_res}, {y_res} = {var}.fit_resample({x}, {y})\n"

RANDOM_UNDERSAMPLER = "RandomUnderSampler"


class UnderSampling(Node):

    def __init__(self, data):
        super().__init__(data)
        self.random_state = data['randomState']

    def import_dependency(self):
        return FROM_IMPORT.format(package="imblearn.under_sampling", class_to_import=RANDOM_UNDERSAMPLER)

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        rus_var = "rus" + str(curr_count)
        x_rus_res = "x_rus_res" + str(curr_count)
        y_rus_res = "y_rus_res" + str(curr_count)
        out_file.write(SAMPLER_INIT.format(var=rus_var, sampler=RANDOM_UNDERSAMPLER, random_state=self.random_state))
        out_file.write(FIT_RESAMPLE.format(x_res=x_rus_res, y_res=y_rus_res, var=rus_var, x=x, y=y))
        out_ds = self.get_port(False, "Balanced Dataset")
        emitter.set(out_ds, (x_rus_res, y_rus_res))

    def assertions(self):
        id_input = self.get_port(True, "Dataset").port_id
        id_output = self.get_port(False, "Balanced Dataset").port_id
        input_ds = Dataset(id_input)
        output_ds = Dataset(id_output)

        return [
            input_ds.cols == output_ds.cols,
            input_ds.dataset == output_ds.dataset,
            Implies(input_ds.balanced, And(
                input_ds.rows == output_ds.rows,
                input_ds.n_labels == output_ds.n_labels,
                input_ds.max_label_count == output_ds.max_label_count,
                input_ds.min_label_count == output_ds.min_label_count
            )),
            Implies(Not(input_ds.balanced), And(
                output_ds.rows == input_ds.min_label_count * input_ds.n_labels,
                input_ds.n_labels == output_ds.n_labels,
                output_ds.max_label_count == input_ds.min_label_count,
                input_ds.min_label_count == output_ds.min_label_count,
            )),
            output_ds.balanced
        ]
