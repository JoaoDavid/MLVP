from typing import Dict
from z3 import *
from mlvp.typecheck.VarNames import *
from mlvp.typecheck.PortProperties import Dataset


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


def oversampling(id_input, id_output, random_state):
    input_ds = Dataset(id_input)
    output_ds = Dataset(id_output)

    return [
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
    ]


def undersampling(id_input, id_output, random_state):
    input_ds = Dataset(id_input)
    output_ds = Dataset(id_output)

    return [
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
    ]


def pca(id_input, id_output, random_state, n_components):
    input_ds = Dataset(id_input)
    output_ds = Dataset(id_output)
    z3_n_components = Int("node" + SEP + "n-components")

    return [
        # requires
        z3_n_components == n_components,
        z3_n_components < input_ds.cols,
        z3_n_components > 0,
        # ensures
        output_ds.cols == z3_n_components + 1,
        output_ds.rows == input_ds.rows,
        output_ds.n_labels == input_ds.n_labels,
        output_ds.max_label_count == input_ds.max_label_count,
        output_ds.min_label_count == input_ds.min_label_count,
        input_ds.balanced == output_ds.balanced,
    ]


# When creating node property assertions,
# first assert that the z3 variable is equal to the received as parameter
# then use the received as parameter to assert whatever you want about it
# in the case of the rfc node, the number of trees must be greater than zero
# therefore we have, the z3 var declaration
# z3_n_trees = Int("node" + SEP + "n-trees")
# then the assertions
# z3_n_trees == n_trees,
# z3_n_trees > 0,

def random_forest_classifier(id_input, n_trees, max_depth):
    input_ds = Dataset(id_input)
    z3_n_trees = Int("node" + SEP + "n-trees")
    z3_max_depth = Int("node" + SEP + "max-depth")

    return [
        # requires
        z3_n_trees == n_trees,
        z3_n_trees > 0,
        z3_max_depth == max_depth,
        Or(z3_max_depth > 0, z3_max_depth == -1),
        input_ds.balanced,
        input_ds.rows > 0,
        input_ds.cols > IntVal(1)
    ]


def evaluate_classifier(id_input_ds):
    input_ds = Dataset(id_input_ds)

    return [
        # requires
        input_ds.balanced,
        input_ds.cols >= 2
    ]


def cross_validation(id_input_ds, n_folds):
    input_ds = Dataset(id_input_ds)

    z3_n_folds = Int("node" + SEP + "n-folds")

    return [
        # requires
        z3_n_folds == n_folds,
        z3_n_folds > 1,
        input_ds.balanced,
        input_ds.cols > 1
    ]

# s = Solver()
# s.add(import_from_csv("a", 5, 8, {"batata": 5, "alface": 3}))
# # s.add(split_dataset("b", "c", "d", 0.5, 0.5, False, True))
# # s.add(oversampling("b", "c", 3))
# s.add(link("a", "b"))
# s.add(undersampling("b", "c", 3))
# s.add(link("c", "d"))
# s.add(split_dataset("d", "e", "f", 0.5, 0.5, False, True))
# s.add(link("e", "g"))
# s.add(pca("g", "h", 0, 3))
#
# if s.check() == sat:
#     m = s.model()
#     m_sorted = sorted([str(d) + " = " + str(m[d]) for d in m], key=lambda x: str(x[0]))
#     for y in m_sorted:
#         print(y)
# else:
#     print("UNSAT")
