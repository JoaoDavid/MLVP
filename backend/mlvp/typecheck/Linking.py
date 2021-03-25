from z3 import *
from mlvp.typecheck.VarNames import *


def link(id_source_port: str, id_target_port: str):
    id_source_port = Dataset(id_source_port)
    port_to = Dataset(id_target_port)

    return [
        id_source_port.cols == port_to.cols,
        id_source_port.rows == port_to.rows,
        id_source_port.balanced == port_to.balanced,
        id_source_port.n_labels == port_to.n_labels,
        id_source_port.max_label_count == port_to.max_label_count,
        id_source_port.min_label_count == port_to.min_label_count,
    ]


class Dataset:

    def __init__(self, id_port: str):
        prefix = id_port + SEP
        self.cols = Int(prefix + N_COLS)
        self.rows = Int(prefix + N_ROWS)
        self.n_labels = Int(prefix + N_LABELS)
        self.max_label_count = Int(prefix + MAX_LABEL_COUNT)
        self.min_label_count = Int(prefix + MIN_LABEL_COUNT)
        self.balanced = Bool(prefix + BALANCED)
