from mlvp.statement.Statement import Statement


class OversamplingStatement(Statement):

    def __init__(self, node_id: str, random_state):
        super().__init__(node_id)
        self.random_state = random_state

