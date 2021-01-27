from mlvp.statement import Statement, Port


class ParentLink:

    def __init__(self, parent_statement: Statement, parent_source_port: Port):
        self.parent_statement = parent_statement
        self.parent_source_port = parent_source_port
