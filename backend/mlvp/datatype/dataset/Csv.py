from mlvp.datatype.dataset.Dataset import Dataset


class Csv(Dataset):

    def __init__(self, file_name: str, num_cols: int, num_rows: int, target: str):
        super().__init__(file_name, num_cols, num_rows, target)
