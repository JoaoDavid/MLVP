from importlib import import_module
from mlvp.graph.ports import ParentLink


class Parser:

    def __init__(self, json_diagram):
        # raw information
        self.json_diagram = json_diagram
        self.json_links = {}
        self.json_nodes = {}

        # parsed information
        self.nodes = {}  # all nodes in the canvas
        self.roots = []  # nodes without input port
        self.loose = []  # nodes with input ports without being linked

    def parse(self):
        for layer in self.json_diagram['layers']:
            if layer['type'] == 'diagram-links':
                self.json_links = layer['models']
            elif layer['type'] == 'diagram-nodes':
                self.json_nodes = layer['models']
        self.__parse_nodes()
        self.__parse_links()
        return self.roots, self.loose

    def __parse_nodes(self):
        for node_id, data in self.json_nodes.items():
            # TODO, security, check if class exists
            node_class = getattr(import_module("mlvp.graph.nodes"), data['type'])
            # Instantiate the class
            node = node_class(data)
            self.__parse_ports(node, data['ports'])
            self.nodes[node_id] = node
            # In case of being a root node, add it to the root array
            if node.is_root:
                self.roots.append(node)
            elif node.is_loose():
                self.loose.append(node)

    def __parse_ports(self, node, json_ports):
        for data in json_ports:
            # TODO, security, check if class exists
            port_class = getattr(import_module("mlvp.graph.ports"), data['type'])
            # Instantiate the class
            port = port_class(data)
            node.ports[data['id']] = port
            if port.in_port:
                node.num_in_ports += 1
                node.is_root = False
            else:
                node.num_out_ports += 1

    def __parse_links(self):
        for link_id, data in self.json_links.items():
            source_node = self.nodes[data['source']]
            source_port = source_node.ports[data['sourcePort']]
            target_node = self.nodes[data['target']]
            target_port = target_node.ports[data['targetPort']]
            # add children and parents to the respective arrays
            source_node.children.append(target_node)
            target_node.parent_links.append(ParentLink(link_id, source_node, source_port, target_port))
