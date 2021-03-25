from mlvp.typecheck import link
import json
from mlvp.ast.nodes import *
from mlvp.ast.ports import *
from z3 import *


def assertions_to_str(ports, assertions):
    res = []
    for assertion in assertions:
        # res.append(str(assertion))
        res.append(__convert_ids(ports, assertion))
    return res


def __convert_ids(ports, expr: ExprRef):
    BINARY_OPERATOR = "({left} {b_op} {right})"
    UNARY_OPERATOR = "({u_op} {expr})"
    res = str(expr)
    if expr.num_args() == 0:
        arr = str(expr).split("_")
        res = "None" if arr[0] == "-1" else arr[0]
        if len(arr) > 1:
            if arr[0] != "node":
                print(ports[arr[0]])
                res = ports[arr[0]].name + " Port " + arr[1]
            else:
                res = "Property " + arr[1]
        return res
    else:
        children = expr.children()
        decl = str(expr.decl())
        if decl in ["==", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/"]:
            return BINARY_OPERATOR.format(left=__convert_ids(ports, children[0]), b_op=decl,
                                          right=__convert_ids(ports, children[1]))
        elif decl == "Not":
            return UNARY_OPERATOR.format(u_op="~", expr=__convert_ids(ports, children[0]))
        elif decl == "And":
            return BINARY_OPERATOR.format(left=__convert_ids(ports, children[0]), b_op="&&",
                                          right=__convert_ids(ports, children[1]))
        elif decl == "Or":
            return BINARY_OPERATOR.format(left=__convert_ids(ports, children[0]), b_op="||",
                                          right=__convert_ids(ports, children[1]))
        elif decl == "Implies":
            return BINARY_OPERATOR.format(left=__convert_ids(ports, children[0]), b_op="-->",
                                          right=__convert_ids(ports, children[1]))
        elif decl in ["ToInt", "ToReal"]:
            return __convert_ids(ports, children[0])


class TypeChecker:

    def __init__(self, roots):
        self.solver = Solver()
        self.roots = roots
        self.node_assertions = {}
        self.link_assertions = {}
        self.unsat_node_assertions = {}
        self.all_link_assertions = []  # list of tuples of type: (link, link_assertions)
        self.all_node_assertions = []  # list of tuples of type: (node, node_assertions)

    def verify(self):
        for root in self.roots:
            self.__traverse_pipeline(root)

        for assertion in self.all_link_assertions:
            self.solver.add(assertion[1])

        self.solver.push()
        for assertion in self.all_node_assertions:
            self.solver.add(assertion[1])

        result = {}
        if self.solver.check() == sat:
            result["canLink"] = True
        else:
            result["canLink"] = False
            self.solver.pop()
            first_problem_index = self.__find_source_unsat(self.all_node_assertions)

            self.solver.pop(first_problem_index + 1)
            self.solver.add(self.all_node_assertions[first_problem_index][1])
            reversed_assertions = reversed(self.all_node_assertions[:first_problem_index])
            self.__find_source_unsat(reversed_assertions)


        result["nodeAssertions"] = self.node_assertions
        result["linkAssertions"] = self.link_assertions
        result["unsatNodeAssertions"] = self.unsat_node_assertions
        return json.dumps(result, indent=4)

    # traverse the pipeline, appending the corresponding assertions to the all_node_assertions list
    def __traverse_pipeline(self, node: Node):
        print(node)
        if not node.visited:
            node.visited = True
            for parent_link in node.parent_links:
                self.__traverse_pipeline(parent_link.parent_node)
            # parents are all visited
            self.__add_dataset_links(node.parent_links)
            # add current node assertions to the array
            node_assertions = node.assertions()
            self.all_node_assertions.append((node, node_assertions))
            self.node_assertions[node.node_id] = assertions_to_str(node.ports, node_assertions)
            # visit every child node
            for child in node.children:
                self.__traverse_pipeline(child)

    def __add_dataset_links(self, parent_links):
        for parent_link in parent_links:
            if isinstance(parent_link.source_port, DatasetPort):
                link_assertions = link(parent_link.source_port.port_id, parent_link.target_port.port_id)
                ports = {parent_link.source_port.port_id: parent_link.source_port,
                         parent_link.target_port.port_id: parent_link.target_port}
                self.link_assertions[parent_link.link_id] = assertions_to_str(ports, link_assertions)
                self.all_link_assertions.append((parent_link, link_assertions))

    def __find_source_unsat(self, list_tuple_assertions):
        for index, assertions in enumerate(list_tuple_assertions):
            node = assertions[0]
            self.solver.push()
            self.solver.add(assertions[1])
            if self.solver.check() == unsat:
                self.solver.pop()
                # found node that causes the unsat
                print("Found source of UNSAT at index " + str(index))
                specific_assertions = self.__find_unsat_node_assertion(assertions)
                self.unsat_node_assertions[node.node_id] = assertions_to_str(node.ports, specific_assertions)
                # info = {'title': node.title, 'assertions': assertions_to_str(node.ports, specific_assertions)}
                # self.unsat_node_assertions[node.node_id] = info
                self.solver.push()
                self.solver.add(assertions[1])
                return index

    def __find_unsat_node_assertion(self, node_assertions):
        print("node_assertions")
        print(node_assertions)
        unsat_assertions = []
        pop_counter = 0
        for curr_asser in node_assertions[1]:
            self.solver.push()
            self.solver.add(curr_asser)
            if self.solver.check() == unsat:
                unsat_assertions.append(curr_asser)
                self.solver.pop()
            else:
                pop_counter += 1
        self.solver.pop(pop_counter)
        return unsat_assertions
