from mlvp.codegen.Emitter import Emitter
from mlvp.codegen.templates.CodeTemplate import SAMPLER_INIT, FIT_RESAMPLE
from mlvp.codegen.templates.LibNames import RANDOM_OVERSAMPLER
from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset
from z3 import *


class Oversampling(Node):

    def __init__(self, node_id: str, title: str, random_state):
        super().__init__(node_id, title)
        self.random_state = random_state

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        ros_var = "ros" + str(curr_count)
        x_ros_res = "x_ros_res" + str(curr_count)
        y_ros_res = "y_ros_res" + str(curr_count)
        out_file.write(SAMPLER_INIT.format(var=ros_var, sampler=RANDOM_OVERSAMPLER, random_state=self.random_state))
        out_file.write(FIT_RESAMPLE.format(x_res=x_ros_res, y_res=y_ros_res, var=ros_var, x=x, y=y))
        out_ds = self.get_port(False, "Balanced Dataset")
        emitter.set(out_ds, (x_ros_res, y_ros_res))

    def type_check(self):
        id_input = self.get_port(True, "Dataset").port_id
        id_output = self.get_port(False, "Balanced Dataset").port_id
        node_assertions = self.assertions(id_input, id_output)
        return node_assertions

    def assertions(self, id_input, id_output):
        input_ds = Dataset(id_input)
        output_ds = Dataset(id_output)

        return [
            input_ds.cols == output_ds.cols,
            Implies(input_ds.balanced, And(
                input_ds.rows == output_ds.rows,
                input_ds.n_labels == output_ds.n_labels,
                input_ds.max_label_count == output_ds.max_label_count,
                input_ds.min_label_count == output_ds.min_label_count
            )),
            Implies(Not(input_ds.balanced), And(
                output_ds.rows == input_ds.max_label_count * input_ds.n_labels,
                input_ds.n_labels == output_ds.n_labels,
                input_ds.max_label_count == output_ds.max_label_count,
                output_ds.min_label_count == output_ds.max_label_count,
            )),
            output_ds.balanced
        ]
