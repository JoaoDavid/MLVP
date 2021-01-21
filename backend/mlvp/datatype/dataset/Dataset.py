from mlvp.datatype.Type import Type


class Dataset(Type):

    def __init__(self, file_name, num_cols, num_rows, label):
        super().__init__()
        self.file_name = file_name
        self.num_cols = num_cols
        self.num_rows = num_rows
        self.label = label

    def __str__(self):
        return type(self).__name__ + self.file_name + " " + str(self.num_cols) + " " + str(self.num_rows) + " " + self.label
