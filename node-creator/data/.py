from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

SAMPLER_INIT = "{var} = {sampler}(random_state={random_state})\n"
FIT_RESAMPLE = "{x_res}, {y_res} = {var}.fit_resample({x}, {y})\n"
# TODO

class Oversampling(Node):

    def __init__(self, data):
        super().__init__(data)
        #TODO

    def import_dependency(self, packages):
        packages.add(FROM_IMPORT.format(package="package", class_to_import="class")) #TODO

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        ros_var = "ros" + str(curr_count)
        x_ros_res = "x_ros_res" + str(curr_count)
        y_ros_res = "y_ros_res" + str(curr_count)

        # TODO
        # out_file.write(SAMPLER_INIT.format(var=ros_var, sampler=RANDOM_OVERSAMPLER, random_state=self.random_state))
        # out_file.write(FIT_RESAMPLE.format(x_res=x_ros_res, y_res=y_ros_res, var=ros_var, x=x, y=y))

        out_ds = self.get_port(False, "Balanced Dataset")
        emitter.set(out_ds, (x_ros_res, y_ros_res))

    def data_flow(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Balanced Dataset")
        output_port.encoded_columns = input_port.encoded_columns
        output_port.columns = input_port.columns

    def assertions(self):
        input_port = self.get_port(True, "Dataset")
        output_port = self.get_port(False, "Balanced Dataset")
        input_ds = Dataset(input_port.port_id)
        output_ds = Dataset(output_port.port_id)

        return [

        ]
