from z3 import *
from VarNames import *


def dataset(id_port: str):
    cols = Int(id_port + N_COLS)
    rows = Int(id_port + N_ROWS)
    n_labels = Int(id_port + N_LABELS)
    max_label_count = Int(id_port + MAX_LABEL_COUNT)
    min_label_count = Int(id_port + MIN_LABEL_COUNT)
    return cols, rows, n_labels, max_label_count, min_label_count
