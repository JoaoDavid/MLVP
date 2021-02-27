from mlvp.nodes import Node
from mlvp.ports.PortType import PortType


class ParentLink:

    def __init__(self, parent_node: Node, parent_source_port: PortType):
        self.parent_node = parent_node
        self.parent_source_port = parent_source_port
