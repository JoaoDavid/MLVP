from abc import ABC, abstractmethod
from z3 import *

SEP = ";"
NODE_PROP = "node;{name};{node_id}"
PORT_PROP = "{id_port};{name}"

IMPORT_AS = "import {lib_name} as {lib_var}\n"
FROM_IMPORT = "from {package} import {class_to_import}\n"


class Node(ABC):

    @abstractmethod
    def __init__(self, data):
        self.node_id = data['id']
        self.title = data['title']
        self.is_root = True
        self.parent_links = []
        self.ports = {}
        self.children = []
        self.visited = False
        self.num_in_ports = 0
        self.num_out_ports = 0
        self.error_msg = []
        pass

    def get_port(self, in_port: bool, name: str):
        for _, port in self.ports.items():
            if name == port.name and port.in_port == in_port:
                return port

    def __has_input_ports(self):
        for _, port in self.ports.items():
            if port.in_port:
                return True
        return False

    def all_input_ports_linked(self):
        return len(self.parent_links) == self.num_in_ports

    def is_loose(self):
        return len(self.parent_links) == 0 and not self.is_root

    @abstractmethod
    def import_dependency(self, packages):
        pass

    @abstractmethod
    def codegen(self, emitter, out_file):
        pass

    # Operates over the columns coming through the input port/s
    # and sends the result to the output port/s
    # based on the node's operations written in the codegen method
    #
    # The columns that must sent to the front-end should be added
    # to the node_columns dict, for instance, for the data scientist
    # to be able to select which column to chose for label encoding
    @abstractmethod
    def data_flow(self, node_columns):
        pass

    # When creating node property assertions with Z3,
    # first assert that the z3 variable is equal to the received as parameter
    # then use the received as parameter to assert whatever you want about it
    # in the case of the rfc node, the number of trees must be greater than zero
    # therefore we have, the z3 var declaration
    # z3_n_trees = Int("node" + SEP + "n-trees")
    # then the assertions
    # z3_n_trees == n_trees,
    # z3_n_trees > 0,
    @abstractmethod
    def assertions(self):
        pass

    def input_ports_linked(self):
        z3_n_in_ports = Int(NODE_PROP.format(name="n_in_ports", node_id=self.node_id))
        z3_n_in_links = Int(NODE_PROP.format(name="n_in_links", node_id=self.node_id))
        return [
            z3_n_in_ports == self.num_in_ports,
            z3_n_in_links == len(self.parent_links),
            z3_n_in_ports == z3_n_in_links,
        ]

    def __str__(self):
        return 'Class: {self.__class__.__name__} \n' \
               'Node Id: {self.node_id} \n' \
               'Parent Links: {self.parent_links} \n' \
               'Ports: {self.ports} \n' \
               'Children: {self.children} \n' \
               'Root: {self.is_root} \n' \
               'Visited: {self.visited} \n'.format(self=self)
