from mlvp.statement.Statement import Statement
from mlvp.datatype.dataset.Dataset import Dataset


class DatasetDeclarationStatement(Statement):

    def __init__(self, node_id: str, ds_type: Dataset, file_name: str, num_cols: int, num_rows: int, label: str):
        super().__init__(node_id)
        self.ds_type = ds_type
        self.file_name = file_name
        self.num_cols = num_cols
        self.num_rows = num_rows
        self.label = label
