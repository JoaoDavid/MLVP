from mlvp.datatype.model.RandomForest import RandomForest
from mlvp.statement.ModelTrainStatement import ModelTrainStatement


class RandomForestStatement(ModelTrainStatement):

    def __init__(self, node_id: str, model_type: RandomForest):
        super().__init__(node_id, model_type)
        self.model_type = model_type
