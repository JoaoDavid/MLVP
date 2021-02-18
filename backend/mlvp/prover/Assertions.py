from typing import Dict
from z3 import *


# And(func(a),func2(b,c,d),link(a,b))
# a_nrows == b_rows
# a_ncols== b_cols

def import_from_csv(id_output: str, n_cols: int, n_rows: int, labels: Dict[str, int]):
    cols = Int(id_output + "_n_cols")
    rows = Int(id_output + "_n_rows")
    label_names = [Int(id_output + "_label_" + key) for key in labels.keys()]
    label_counts = list(labels.values())
    labels_values = [label_names[i] == label_counts[i] for i in range(len(labels))]
    balanced_output = Bool(id_output + "_balanced")
    list_balanced = [label_counts[i] == label_counts[i + 1] for i in range(len(labels) - 1)]
    return And(
        cols == n_cols,
        rows == n_rows,
        rows == sum(label_counts),
        And(labels_values),
        balanced_output == And(list_balanced)
    )


def split_dataset(id_input, id_output_train, id_output_test, test_size, train_size, shuffle):
    cols_input = Int(id_input + "_n_cols")
    rows_input = Int(id_input + "_n_rows")
    cols_output_train = Int(id_output_train + "_n_cols")
    rows_output_train = Int(id_output_train + "_n_rows")
    cols_output_test = Int(id_output_test + "_n_cols")
    rows_output_test = Int(id_output_test + "_n_rows")
    shuffle_input = Bool(id_input + "_shuffled")
    shuffle_output_train = Bool(id_output_train + "_shuffled")
    shuffle_output_test = Bool(id_output_test + "_shuffled")
    output_shuffles = Or(shuffle_input, shuffle)
    balanced_input = Bool(id_input + "_balanced")
    return And(
        # Requires
        rows_input >= 2,
        balanced_input,
        #
        rows_output_train == ToInt(ToReal(rows_input) * train_size),
        rows_output_test == ToInt(ToReal(rows_input) * test_size),
        cols_input == cols_output_train,
        cols_output_train == cols_output_test,
        shuffle_output_train == output_shuffles,
        shuffle_output_test == output_shuffles
    )


def link(id_from: str, id_to: str):
    cols_from = Int(id_from + "_n_cols")
    rows_from = Int(id_from + "_n_rows")
    balanced_from = Bool(id_from + "_balanced")
    cols_to = Int(id_to + "_n_cols")
    rows_to = Int(id_to + "_n_rows")
    balanced_to = Bool(id_to + "_balanced")
    return And(
        cols_from == cols_to,
        rows_from == rows_to,
        balanced_from == balanced_to
    )


def oversampling(id_input, id_output, random_state):
    cols_input = Int(id_input + "_n_cols")
    rows_input = Int(id_input + "_n_rows")
    cols_output = Int(id_output + "_n_cols")
    rows_output = Int(id_output + "_n_rows")
    balanced_output = Bool(id_output + "_balanced")
    return And(
        cols_input == cols_output,
        rows_input <= rows_output,
        balanced_output
    )


# mais de duas rows e mais de 3 colunas
def func3(id_input):
    cols = Int(id_input + "_n_cols")
    rows = Int(id_input + "_n_rows")
    return And(cols > 3, rows > 2)
