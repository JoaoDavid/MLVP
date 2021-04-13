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


PORT_PROP = "{id_port}:{name}"
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

# column_index = Function('column_name', dataset_id, column_name, exists_or_not)
column_exists = Function('column_exists', StringSort(), StringSort(), BoolSort())

and_or = Function('and_or', ColumnType, ColumnType, ColumnType)
equality = Function('equality', ColumnType, ColumnType, ColumnType)
compare_dimension = Function('compare_dimension', ColumnType, ColumnType, ColumnType)
plus = Function('plus', ColumnType, ColumnType, ColumnType)
sub = Function('subtraction', ColumnType, ColumnType, ColumnType)
div = Function('subtraction', ColumnType, ColumnType, ColumnType)
mod = Function('subtraction', ColumnType, ColumnType, ColumnType)
multiplication = Function('multiplication', ColumnType, ColumnType, ColumnType)
negate = Function('negate', ColumnType, ColumnType)
negative = Function('negative', ColumnType, ColumnType)

and_or_rule = [
    and_or(ColumnType.bool, ColumnType.bool) == ColumnType.bool
]

compare_dimension_rule = [
    Or(
        compare_dimension(ColumnType.int, ColumnType.int) == ColumnType.bool,
        compare_dimension(ColumnType.int, ColumnType.float) == ColumnType.bool,
        compare_dimension(ColumnType.float, ColumnType.float) == ColumnType.bool,
        compare_dimension(ColumnType.float, ColumnType.int) == ColumnType.bool,
        compare_dimension(ColumnType.string, ColumnType.string) == ColumnType.bool,
    )
]

plus_rule = [
    Or(
        plus(ColumnType.int, ColumnType.int) == ColumnType.int,
        plus(ColumnType.int, ColumnType.float) == ColumnType.float,
        plus(ColumnType.float, ColumnType.float) == ColumnType.float,
        plus(ColumnType.float, ColumnType.int) == ColumnType.float,
        plus(ColumnType.string, ColumnType.string) == ColumnType.string,
    )
]

sub_rule = [
    Or(
        sub(ColumnType.int, ColumnType.int) == ColumnType.int,
        sub(ColumnType.int, ColumnType.float) == ColumnType.float,
        sub(ColumnType.float, ColumnType.float) == ColumnType.float,
        sub(ColumnType.float, ColumnType.int) == ColumnType.float,
    )
]

mod_rule = [
    Or(
        sub(ColumnType.int, ColumnType.int) == ColumnType.int,
        sub(ColumnType.int, ColumnType.float) == ColumnType.float,
        sub(ColumnType.float, ColumnType.float) == ColumnType.float,
        sub(ColumnType.float, ColumnType.int) == ColumnType.float,
    )
]

div_rule = [
    Or(
        div(ColumnType.int, ColumnType.int) == ColumnType.float,
        div(ColumnType.int, ColumnType.float) == ColumnType.float,
        div(ColumnType.float, ColumnType.float) == ColumnType.float,
        div(ColumnType.float, ColumnType.int) == ColumnType.float,
    )
]

mul_rule = [
    Or(
        multiplication(ColumnType.int, ColumnType.int) == ColumnType.int,
        multiplication(ColumnType.int, ColumnType.float) == ColumnType.float,
        multiplication(ColumnType.float, ColumnType.float) == ColumnType.float,
        multiplication(ColumnType.float, ColumnType.int) == ColumnType.float,
    )
]

negate_rule = [
    negate(ColumnType.bool) == ColumnType.bool,
]

negative_rule = [
    Or(
        negative(ColumnType.int) == ColumnType.int,
        negative(ColumnType.float) == ColumnType.float,
    )
]


operator_rules = and_or_rule + compare_dimension_rule + plus_rule + sub_rule + \
                 mod_rule + div_rule + mul_rule + negate_rule + negative_rule

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
