from mlvp.codegen.templates.LibNames import *
from mlvp.ports import ParentLink
from mlvp.ports import DatasetPort, ModelPort
from mlvp.nodes import *


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
            title = data['title']
            if data['type'] == 'NODE_ABSTRACT_DS':
                node = AbstractDataset(node_id=node_id, title=title, num_cols=data['numCols'], num_rows=data['numRows'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.roots.append(node)

            elif data['type'] == 'NODE_IMPORT_CSV':
                target = None if len(data['columnNames']) == 0 else data['columnNames'][-1]
                node = ImportFromCSV(node_id=node_id, title=title, file_name=data['fileName'],
                                     num_cols=data['numCols'], num_rows=data['numRows'],
                                     target=target,
                                     labels=data['labels'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node
                self.roots.append(node)

            elif data['type'] == 'NODE_SPLIT_DATASET':
                node = SplitDataset(node_id=node_id, title=title, test_size=data['testSize'],
                                    train_size=data['trainSize'], shuffle=bool(data['shuffle']))
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node

            elif data['type'] == 'NODE_OVERSAMPLING':
                node = Oversampling(node_id=node_id, title=title, random_state=data['randomState'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node

            elif data['type'] == 'NODE_UNDERSAMPLING':
                node = UnderSampling(node_id=node_id, title=title, random_state=data['randomState'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node

            elif data['type'] == 'NODE_PCA':
                node = PCA(node_id=node_id, title=title, random_state=data['randomState'],
                           num_components=data['numComponents'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node

            elif data['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
                node = RandomForestClassifier(node_id=node_id, title=title, num_trees=data['numTrees'],
                                              criterion=data['criterion'], max_depth=data['maxDepth'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node

            elif data['type'] == 'NODE_ACCURACY_CLASSIFIER':
                node = EvaluateClassifier(node_id=node_id, title=title)
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node

            elif data['type'] == 'NODE_CROSS_VALIDATION_CLASSIFIER':
                node = CrossValidation(node_id=node_id, title=title, num_folds=data['numberFolds'])
                node.ports = self.__parse_ports(data['ports'])
                self.nodes[node_id] = node

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
        for p in json_ports:
            port_type = p['type']
            if "PORT_DATASET" in port_type:
                ports[p['id']] = DatasetPort(p['id'], p['name'], bool(p['in']))
            elif "PORT_CLASSIFIER" in port_type:
                ports[p['id']] = ModelPort(p['id'], p['name'], bool(p['in']))
        return ports
