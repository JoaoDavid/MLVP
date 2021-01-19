from mlvp.datatype.Type import Type


class Csv(Type):

    def __init__(self, file_name, num_cols, num_rows):
        self.file_name = file_name
        self.num_cols = num_cols
        self.num_rows = num_rows
