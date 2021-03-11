from z3 import *
from mlvp.prover.VarNames import *


class Dataset:

    def __init__(self, id_port: str):
        prefix = id_port + SEP
        self.cols = Int(prefix + N_COLS)
        self.rows = Int(prefix + N_ROWS)
        self.n_labels = Int(prefix + N_LABELS)
        self.max_label_count = Int(prefix + MAX_LABEL_COUNT)
        self.min_label_count = Int(prefix + MIN_LABEL_COUNT)
        self.balanced = Bool(prefix + BALANCED)
