from mlvp.statement import Statement
from mlvp.ports.PortType import PortType


class ParentLink:

    def __init__(self, parent_statement: Statement, parent_source_port: PortType):
        self.parent_statement = parent_statement
        self.parent_source_port = parent_source_port
