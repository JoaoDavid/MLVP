from typing import Dict
from z3 import *
from mlvp.prover.VarNames import *
from mlvp.prover.PortProperties import Dataset


def abstract_ds(id_output: str, n_cols: int, n_rows: int):
    output = Dataset(id_output)

    return And(
        output.cols == n_cols,
        output.rows == n_rows,
    )


def import_from_csv(id_output: str, n_cols: int, n_rows: int, labels: Dict[str, int]):
    output = Dataset(id_output)

    label_names = [Int(id_output + "_label_" + key) for key in labels.keys()]
    label_counts = list(labels.values())
    labels_values = [label_names[i] == label_counts[i] for i in range(len(labels))]

    list_balanced = [label_counts[i] == label_counts[i + 1] for i in range(len(labels) - 1)]
    # list_balanced = [abs(label_counts[i] - label_counts[i + 1]) <= 1 for i in range(len(labels) - 1)]
    return And(
        output.cols == n_cols,
        output.rows == n_rows,
        output.rows == sum(label_counts),
        And(labels_values),
        output.balanced == And(list_balanced),
        output.n_labels == len(label_counts),
        output.max_label_count == max(label_counts),
        output.min_label_count == min(label_counts)
    )


def split_dataset(id_input, id_output_train, id_output_test, test_size, train_size, shuffle, stratify):
    input_ds = Dataset(id_input)
    train_ds = Dataset(id_output_train)
    test_ds = Dataset(id_output_test)

    shuffle_input = Bool(id_input + SHUFFLED)
    shuffle_train = Bool(id_output_train + SHUFFLED)
    shuffle_test = Bool(id_output_test + SHUFFLED)
    output_shuffles = Or(shuffle_input, shuffle)

    return And(
        # requires
        input_ds.rows >= 2,
        # falta relacionar os min e max label count
        # ensures
        train_ds.rows == ToInt(ToReal(input_ds.rows) * train_size),
        test_ds.rows == ToInt(ToReal(input_ds.rows) * test_size),
        input_ds.cols == train_ds.cols,
        train_ds.cols == test_ds.cols,
        train_ds.n_labels == ToInt(ToReal(input_ds.n_labels) * train_size),
        test_ds.n_labels == ToInt(ToReal(input_ds.n_labels) * test_size),
        Implies(stratify, And(train_ds.balanced, test_ds.balanced)),

        shuffle_train == output_shuffles,
        shuffle_test == output_shuffles
    )


def link(id_from: str, id_to: str):
    port_from = Dataset(id_from)
    port_to = Dataset(id_to)

    return And(
        port_from.cols == port_to.cols,
        port_from.rows == port_to.rows,
        port_from.balanced == port_to.balanced,
        port_from.n_labels == port_to.n_labels,
        port_from.max_label_count == port_to.max_label_count,
        port_from.min_label_count == port_to.min_label_count,
    )


def oversampling(id_input, id_output, random_state):
    input_ds = Dataset(id_input)
    output_ds = Dataset(id_output)

    return And(
        input_ds.cols == output_ds.cols,
        Implies(input_ds.balanced, And(
            input_ds.rows == output_ds.rows,
            input_ds.n_labels == output_ds.n_labels,
            input_ds.max_label_count == output_ds.max_label_count,
            input_ds.min_label_count == output_ds.min_label_count
        )),
        Implies(Not(input_ds.balanced), And(
            output_ds.rows == input_ds.max_label_count * input_ds.n_labels,
            input_ds.n_labels == output_ds.n_labels,
            input_ds.max_label_count == output_ds.max_label_count,
            output_ds.min_label_count == output_ds.max_label_count,
        )),
        output_ds.balanced
    )


def undersampling(id_input, id_output, random_state):
    input_ds = Dataset(id_input)
    output_ds = Dataset(id_output)

    return And(
        input_ds.cols == output_ds.cols,
        Implies(input_ds.balanced, And(
            input_ds.rows == output_ds.rows,
            input_ds.n_labels == output_ds.n_labels,
            input_ds.max_label_count == output_ds.max_label_count,
            input_ds.min_label_count == output_ds.min_label_count
        )),
        Implies(Not(input_ds.balanced), And(
            output_ds.rows == input_ds.min_label_count * input_ds.n_labels,
            input_ds.n_labels == output_ds.n_labels,
            output_ds.max_label_count == input_ds.min_label_count,
            input_ds.min_label_count == output_ds.min_label_count,
        )),
        output_ds.balanced
    )


def pca(id_input, id_output, random_state, n_components):
    input_ds = Dataset(id_input)
    output_ds = Dataset(id_output)

    return And(
        # requires
        n_components < input_ds.cols,
        n_components > 0,
        # ensures
        output_ds.cols == n_components + 1,
        output_ds.rows == input_ds.rows,
        output_ds.n_labels == input_ds.n_labels,
        output_ds.max_label_count == input_ds.max_label_count,
        output_ds.min_label_count == input_ds.min_label_count,
        input_ds.balanced == output_ds.balanced,
    )


def random_forest_classifier(id_input, n_trees, max_depth):
    input_ds = Dataset(id_input)

    return And(
        # requires
        n_trees > 0,
        Or(max_depth > 0, max_depth == -1),
        input_ds.balanced,
        input_ds.cols > 1
    )


def evaluate_classifier(id_input_ds):
    input_ds = Dataset(id_input_ds)

    return And(
        # requires
        input_ds.balanced,
        input_ds.cols >= 2
    )


def cross_validation(id_input_ds, n_folds):
    input_ds = Dataset(id_input_ds)

    return And(
        # requires
        n_folds > 1,
        input_ds.balanced,
        input_ds.cols > 1
    )


s = Solver()
s.add(import_from_csv("a", 5, 8, {"batata": 5, "alface": 3}))
# s.add(split_dataset("b", "c", "d", 0.5, 0.5, False, True))
# s.add(oversampling("b", "c", 3))
s.add(link("a", "b"))
s.add(undersampling("b", "c", 3))
s.add(link("c", "d"))
s.add(split_dataset("d", "e", "f", 0.5, 0.5, False, True))
s.add(link("e", "g"))
s.add(pca("g", "h", 0, 3))

if s.check() == sat:
    m = s.model()
    m_sorted = sorted([str(d) + " = " + str(m[d]) for d in m], key=lambda x: str(x[0]))
    for y in m_sorted:
        print(y)
else:
    print("UNSAT")
