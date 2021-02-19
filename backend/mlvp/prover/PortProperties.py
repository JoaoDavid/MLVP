from z3 import *
from VarNames import *


class Dataset:

    def __init__(self, id_port: str):
        self.cols = Int(id_port + N_COLS)
        self.rows = Int(id_port + N_ROWS)
        self.n_labels = Int(id_port + N_LABELS)
        self.max_label_count = Int(id_port + MAX_LABEL_COUNT)
        self.min_label_count = Int(id_port + MIN_LABEL_COUNT)
