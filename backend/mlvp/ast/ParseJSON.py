import importlib

from mlvp.ast.ports import ParentLink


class ParseJSON:

    def __init__(self, json_diagram):
        self.json_diagram = json_diagram
        self.json_links = {}
        self.json_nodes = {}
        # parsed information
        self.nodes = {}
        # array of orphan nodes
        # nodes that have no parents linked to them
        self.roots = []
        self.loose = []

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
            node_class = getattr(importlib.import_module("mlvp.ast.nodes"), data['type'])
            # Instantiate the class
            node = node_class(data)
            node.ports, node.is_root = self.__parse_ports(data['ports'])
            self.nodes[node_id] = node
            # In case of being a root node, add it to the root array
            if node.is_root:
                self.roots.append(node)
            elif node.is_loose():
                self.loose.append(node)

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
        is_root = False
        for data in json_ports:
            # TODO, security, check if class exists
            port_class = getattr(importlib.import_module("mlvp.ast.ports"), data['type'])
            # Instantiate the class
            port = port_class(data)
            ports[data['id']] = port
            is_root = not port.in_port or is_root
        return ports, is_root
