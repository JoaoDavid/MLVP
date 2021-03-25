# When creating node property assertions,
# first assert that the z3 variable is equal to the received as parameter
# then use the received as parameter to assert whatever you want about it
# in the case of the rfc node, the number of trees must be greater than zero
# therefore we have, the z3 var declaration
# z3_n_trees = Int("node" + SEP + "n-trees")
# then the assertions
# z3_n_trees == n_trees,
# z3_n_trees > 0,



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
