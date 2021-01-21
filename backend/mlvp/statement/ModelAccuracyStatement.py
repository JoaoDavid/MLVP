from mlvp.statement.Statement import Statement


class ModelAccuracyStatement(Statement):

    def __init__(self, node_id: str, parents):
        super().__init__(node_id, parents)
