from z3 import *


def link(id_source_port: str, id_target_port: str):
    id_source_port = Dataset(id_source_port)
    port_to = Dataset(id_target_port)

    return [
        id_source_port.cols == port_to.cols,
        id_source_port.rows == port_to.rows,
        id_source_port.balanced == port_to.balanced,
        id_source_port.time_series == port_to.time_series,
        id_source_port.dataset == port_to.dataset,
        id_source_port.n_labels == port_to.n_labels,
        id_source_port.max_label_count == port_to.max_label_count,
        id_source_port.min_label_count == port_to.min_label_count,
    ]


PORT_PROP = "{id_port};{name}"
ColumnType = Datatype('ColumnType')
ColumnType.declare('int')
ColumnType.declare('float')
ColumnType.declare('string')
ColumnType.declare('bool')
ColumnType.declare('mixed')
ColumnType = ColumnType.create()

# column = Function('column', dataset_id, column_name, column_type)
column = Function('column', StringSort(), StringSort(), ColumnType)

# column_index = Function('column_index', dataset_id, index, column_type)
column_index = Function('column_index', StringSort(), IntSort(), ColumnType)

# column_index = Function('column_name', dataset_id, index, column_name)
get_col_name = Function('get_col_name', StringSort(), IntSort(), StringSort())


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
