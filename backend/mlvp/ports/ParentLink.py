from mlvp.nodes import Node
from mlvp.ports.PortType import PortType


class ParentLink:

    def __init__(self, link_id: str, parent_node: Node, source_port: PortType, target_port: PortType):
        self.link_id = link_id
        self.parent_node = parent_node
        self.source_port = source_port
        self.target_port = target_port
