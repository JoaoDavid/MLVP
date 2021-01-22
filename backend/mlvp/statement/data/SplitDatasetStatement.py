from mlvp.statement.Statement import Statement
from mlvp.datatype.dataset.Dataset import Dataset


class SplitDatasetStatement(Statement):

    def __init__(self, node_id: str, ds_type: Dataset):
        super().__init__(node_id)
        self.ds_type = ds_type
