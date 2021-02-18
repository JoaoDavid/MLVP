from typing import Dict
from z3 import *
from VarNames import *


# And(func(a),func2(b,c,d),link(a,b))
# a_nrows == b_rows
# a_ncols== b_cols

def import_from_csv(id_output: str, n_cols: int, n_rows: int, labels: Dict[str, int]):
    cols = Int(id_output + N_COLS)
    rows = Int(id_output + N_ROWS)
    label_names = [Int(id_output + "_label_" + key) for key in labels.keys()]
    label_counts = list(labels.values())
    labels_values = [label_names[i] == label_counts[i] for i in range(len(labels))]
    balanced_output = Bool(id_output + BALANCED)
    n_labels = Int(id_output + "_n_labels")
    max_label_count = Int(id_output + "_max_label_count")
    min_label_count = Int(id_output + "_min_label_count")
    list_balanced = [label_counts[i] == label_counts[i + 1] for i in range(len(labels) - 1)]
    # list_balanced = [abs(label_counts[i] - label_counts[i + 1]) <= 1 for i in range(len(labels) - 1)]
    return And(
        cols == n_cols,
        rows == n_rows,
        rows == sum(label_counts),
        And(labels_values),
        balanced_output == And(list_balanced),
        n_labels == len(label_counts),
        max_label_count == max(label_counts),
        min_label_count == min(label_counts)
    )


def split_dataset(id_input, id_output_train, id_output_test, test_size, train_size, shuffle):
    cols_input = Int(id_input + N_COLS)
    rows_input = Int(id_input + N_ROWS)
    cols_output_train = Int(id_output_train + N_COLS)
    rows_output_train = Int(id_output_train + N_ROWS)
    cols_output_test = Int(id_output_test + N_COLS)
    rows_output_test = Int(id_output_test + N_ROWS)
    shuffle_input = Bool(id_input + SHUFFLED)
    shuffle_output_train = Bool(id_output_train + SHUFFLED)
    shuffle_output_test = Bool(id_output_test + SHUFFLED)
    output_shuffles = Or(shuffle_input, shuffle)
    balanced_input = Bool(id_input + BALANCED)
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
    cols_from = Int(id_from + N_COLS)
    rows_from = Int(id_from + N_ROWS)
    balanced_from = Bool(id_from + BALANCED)
    cols_to = Int(id_to + N_COLS)
    rows_to = Int(id_to + N_ROWS)
    balanced_to = Bool(id_to + BALANCED)
    return And(
        cols_from == cols_to,
        rows_from == rows_to,
        balanced_from == balanced_to
    )


def oversampling(id_input, id_output, random_state):
    cols_input = Int(id_input + N_COLS)
    rows_input = Int(id_input + N_ROWS)
    cols_output = Int(id_output + N_COLS)
    rows_output = Int(id_output + N_ROWS)
    balanced_input = Bool(id_input + BALANCED)
    balanced_output = Bool(id_output + BALANCED)
    return And(
        cols_input == cols_output,
        Implies(balanced_input, rows_input == rows_output),
        balanced_output
    )


# mais de duas rows e mais de 3 colunas
def func3(id_input):
    cols = Int(id_input + N_COLS)
    rows = Int(id_input + N_ROWS)
    return And(cols > 3, rows > 2)

s = Solver()
s.add(import_from_csv("a", 5, 10, {"batata": 5, "alface": 5}))
# s.add(split_dataset("b", "c", "d", 0.5, 0.5, False))
s.add(oversampling("b", "c", 3))
s.add(link("a", "b"))
print(s.check())
print(s.model())
