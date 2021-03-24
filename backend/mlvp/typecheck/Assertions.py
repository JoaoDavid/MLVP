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


# When creating node property assertions,
# first assert that the z3 variable is equal to the received as parameter
# then use the received as parameter to assert whatever you want about it
# in the case of the rfc node, the number of trees must be greater than zero
# therefore we have, the z3 var declaration
# z3_n_trees = Int("node" + SEP + "n-trees")
# then the assertions
# z3_n_trees == n_trees,
# z3_n_trees > 0,


def evaluate_classifier(id_input_ds):
    input_ds = Dataset(id_input_ds)

    return [
        # requires
        input_ds.balanced,
        input_ds.cols >= 2
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
