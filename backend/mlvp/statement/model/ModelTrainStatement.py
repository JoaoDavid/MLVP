from mlvp.statement.Statement import Statement


class ModelTrainStatement(Statement):

    def __init__(self, node_id: str):
        super().__init__(node_id)
