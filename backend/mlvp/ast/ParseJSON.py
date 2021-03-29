import importlib

from mlvp.ast.ports import ParentLink


class ParseJSON:

    def __init__(self, json_diagram):
        self.json_diagram = json_diagram
        self.json_links = {}
        self.json_nodes = {}
        # parsed information
        self.nodes = {}
        self.roots = []

    def parse(self):
        for layer in self.json_diagram['layers']:
            if layer['type'] == 'diagram-links':
                self.json_links = layer['models']
            elif layer['type'] == 'diagram-nodes':
                self.json_nodes = layer['models']
        self.__parse_nodes()
        self.__parse_links()
        return self.roots

    def __parse_nodes(self):
        for node_id, data in self.json_nodes.items():
            # TODO, security, check if class exists
            node_class = getattr(importlib.import_module("mlvp.ast.nodes"), data['type'])
            # Instantiate the class
            node = node_class(data)
            node.ports = self.__parse_ports(data['ports'])
            self.nodes[node_id] = node
            # In case of being a root node, add it to the root array
            if node.is_root or len(node.parent_links) == 0:
                self.roots.append(node)

    def __parse_links(self):
        for link_id, data in self.json_links.items():
            source_node = self.nodes[data['source']]
            source_port = source_node.ports[data['sourcePort']]
            target_node = self.nodes[data['target']]
            target_port = target_node.ports[data['targetPort']]
            # add children and parents to the respective arrays
            source_node.children.append(target_node)
            target_node.parent_links.append(ParentLink(link_id, source_node, source_port, target_port))

    def __parse_ports(self, json_ports):
        ports = {}
        for data in json_ports:
            # TODO, security, check if class exists
            port_class = getattr(importlib.import_module("mlvp.ast.ports"), data['type'])
            # Instantiate the class
            ports[data['id']] = port_class(data)
        return ports
