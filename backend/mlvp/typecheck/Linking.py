from z3 import *


def link(id_source_port: str, id_target_port: str):
    source = Dataset(id_source_port)
    target = Dataset(id_target_port)

    return [
        source.cols == target.cols,
        source.rows == target.rows,
        source.balanced == target.balanced,
        source.time_series == target.time_series,
        source.dataset == target.dataset,
        source.n_labels == target.n_labels,
        source.max_label_count == target.max_label_count,
        source.min_label_count == target.min_label_count,
        source.reduced == target.reduced,
        source.processed == target.processed,
    ]


PORT_PROP = "{id_port};{name}"
ColumnType = Datatype('ColumnType')
ColumnType.declare('int')
ColumnType.declare('float')
ColumnType.declare('string')
ColumnType.declare('bool')
ColumnType.declare('mixed')
ColumnType.declare('one_hot_encoded')
ColumnType = ColumnType.create()

# column = Function('column', dataset_id, column_name, column_type)
column = Function('column', StringSort(), StringSort(), ColumnType)


def get_col_type(col_str):
    if col_str == "int":
        return ColumnType.int
    elif col_str == "float":
        return ColumnType.float
    elif col_str == "string":
        return ColumnType.string
    elif col_str == "bool":
        return ColumnType.bool
    elif col_str == "mixed":
        return ColumnType.mixed
    elif col_str == "one_hot_encoded":
        return ColumnType.one_hot_encoded


class Dataset:

    def __init__(self, id_port: str):
        self.cols = Int(PORT_PROP.format(id_port=id_port, name="n_cols"))
        self.rows = Int(PORT_PROP.format(id_port=id_port, name="n_rows"))
        self.n_labels = Int(PORT_PROP.format(id_port=id_port, name="n_labels"))
        self.max_label_count = Int(PORT_PROP.format(id_port=id_port, name="max_label_count"))
        self.min_label_count = Int(PORT_PROP.format(id_port=id_port, name="min_label_count"))
        self.balanced = Bool(PORT_PROP.format(id_port=id_port, name="balanced"))
        self.time_series = Bool(PORT_PROP.format(id_port=id_port, name="time_series"))
        self.dataset = String(PORT_PROP.format(id_port=id_port, name="dataset"))
        self.reduced = Bool(PORT_PROP.format(id_port=id_port, name="reduced"))
        self.processed = Bool(PORT_PROP.format(id_port=id_port, name="processed"))
