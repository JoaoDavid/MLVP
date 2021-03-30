from mlvp.ast.nodes import Node
from mlvp.ast.ports import PortType


class ParentLink:

    def __init__(self, link_id: str, parent_node: Node, source_port: PortType, target_port: PortType):
        self.link_id = link_id
        self.parent_node = parent_node
        self.source_port = source_port
        self.target_port = target_port

    def __str__(self):
        return 'Class: {self.__class__.__name__} ' \
               'Link Id: {self.link_id} ' \
               'Source Node: {self.parent_node} ' \
               'Source Port: {self.source_port} ' \
               'Target Port: {self.target_port} '.format(self=self)
