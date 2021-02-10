from mlvp.statement.Statement import Statement


class CrossValidationStatement(Statement):

    def __init__(self, node_id: str, number_folds: int):
        super().__init__(node_id)
        self.number_folds = number_folds
