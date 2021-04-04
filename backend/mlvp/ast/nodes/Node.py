from abc import ABC, abstractmethod
from z3 import *

SEP = ":"
NODE_PROP = "node:{name}:{node_id}"

IMPORT_AS = "import {lib_name} as {lib_var}\n"
FROM_IMPORT = "from {package} import {class_to_import}\n"

class Node(ABC):

    @abstractmethod
    def __init__(self, data):
        self.node_id = data['id']
        self.title = data['title']
        self.is_root = True
        self.in_pipeline = True
        self.parent_links = []
        self.ports = {}
        self.children = []
        self.visited = False
        self.num_in_ports = 0
        self.num_out_ports = 0
        pass

    def get_port(self, in_port: bool, name: str):
        for _, port in self.ports.items():
            if name == port.name and port.in_port == in_port:
                return port

    def __has_input_ports(self):
        print(self.ports)
        for _, port in self.ports.items():
            if port.in_port:
                return True
        return False

    def reset_visited(self):
        self.visited = False
        for child in self.children:
            child.reset_visited()

    def is_loose(self):
        return len(self.parent_links) == 0 and not self.is_root

    @abstractmethod
    def import_dependency(self):
        pass

    @abstractmethod
    def codegen(self, emitter, out_file):
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
        z3_in_pipeline = Bool(NODE_PROP.format(name="in_pipeline", node_id=self.node_id))
        z3_n_in_ports = Int(NODE_PROP.format(name="n_in_ports", node_id=self.node_id))
        z3_n_in_links = Int(NODE_PROP.format(name="n_in_links", node_id=self.node_id))
        return [
            # Implies(Not(len(self.children) == 0), self.num_in_ports == len(self.parent_links))
            z3_in_pipeline == self.in_pipeline,
            z3_n_in_ports == self.num_in_ports,
            z3_n_in_links == len(self.parent_links),
            z3_n_in_ports == z3_n_in_links,
            # Implies(z3_in_pipeline, And(z3_n_in_ports == z3_n_in_links))
        ]

    def __str__(self):
        return 'Class: {self.__class__.__name__} \n' \
               'Node Id: {self.node_id} \n' \
               'Parent Links: {self.parent_links} \n' \
               'Ports: {self.ports} \n' \
               'Children: {self.children} \n' \
               'Visited: {self.visited} \n'.format(self=self)
