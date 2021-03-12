from mlvp.prover.Assertions import *
from z3 import *
import json


class ValidateLinks:

    def __init__(self, links_data):
        self.json_links = links_data["links"]
        self.json_nodes = links_data["nodes"]
        self.assertions = []
        self.solver = Solver()
        self.map_assertions = {}
        self.link_assertions = {}
        self.map_ports = {}  # k=port_id v=port_name

    def validate(self):
        print("Number of links: " + str(len(self.json_links)))

        for node_json in self.json_nodes:
            self.solver.push()
            node_assertions = self.__parse_node(node_json)
            self.solver.add(node_assertions)

        for link_json in self.json_links:
            print(link_json)
            link_assertions = link(link_json['sourcePortId'], link_json['targetPortId'])
            self.link_assertions[link_json['linkId']] = self.__convert_assertions_to_str(link_assertions)
            self.solver.add(link_assertions)

        print(self.link_assertions)
        # self.solver.add(self.assertions)
        result = {}
        if self.solver.check() == sat:
            result["canLink"] = True
        else:
            result["canLink"] = False
            # index_error = self.__binary_search_for_unsat(self.assertions, 0, len(self.assertions) - 1)
            for i in reversed(range(len(self.json_nodes))):
                self.solver.pop()
                self.solver.check()

                if self.solver.check() == sat:
                    node = self.json_nodes[i]
                    print(node['title'])
                    result["nodeId"] = str(node["id"])
                    problems = self.__parse_node(node)
                    self.map_assertions[node["id"]] = self.__convert_assertions_to_str(problems)
                    result["problems"] = self.__find_unsat_node_assertion(problems)

        result["nodeAssertions"] = self.map_assertions
        result["linkAssertions"] = self.link_assertions
        return json.dumps(result, indent=4)

    def __parse_node(self, data):
        if data['type'] == 'NODE_ABSTRACT_DS':
            id_output = self.__find_port(data['ports'], False, "Dataset")
            return abstract_ds(id_output, data['numCols'], data['numRows'])
        elif data['type'] == 'NODE_IMPORT_CSV':
            id_output = self.__find_port(data['ports'], False, "Dataset")
            return import_from_csv(id_output, data['numCols'], data['numRows'], data['labels'])
        elif data['type'] == 'NODE_SPLIT_DATASET':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output_train = self.__find_port(data['ports'], False, "Train Dataset")
            id_output_test = self.__find_port(data['ports'], False, "Test Dataset")
            return split_dataset(id_input, id_output_train, id_output_test, data['testSize'],
                                 data['trainSize'], data['shuffle'] == True, True)
        elif data['type'] == 'NODE_OVERSAMPLING':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Balanced Dataset")
            return oversampling(id_input, id_output, data['randomState'])
        elif data['type'] == 'NODE_UNDERSAMPLING':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Balanced Dataset")
            return undersampling(id_input, id_output, data['randomState'])
        elif data['type'] == 'NODE_PCA':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            id_output = self.__find_port(data['ports'], False, "Reduced Dataset")
            return pca(id_input, id_output, data['randomState'], 2)
        elif data['type'] == 'NODE_RANDOM_FOREST_CLASSIFIER':
            id_input = self.__find_port(data['ports'], True, "Dataset")
            maxDepth = -1 if data['maxDepth'] == "None" else data['maxDepth']
            return random_forest_classifier(id_input, data['numTrees'], maxDepth)
        elif data['type'] == 'NODE_ACCURACY_CLASSIFIER':
            id_input_ds = self.__find_port(data['ports'], True, "Dataset")
            return evaluate_classifier(id_input_ds)
        elif data['type'] == 'NODE_CROSS_VALIDATION':
            id_input_ds = self.__find_port(data['ports'], True, "Dataset")
            return cross_validation(id_input_ds, data['numberFolds'])

    def __find_port(self, ports, is_in, name):
        for port in ports:
            if name == port['name'] and is_in == port['in']:
                self.map_ports[port['id']] = port['name']
                return port['id']

    def __binary_search_for_unsat(self, array, l, r):
        print(str(len(array)) + " " + str(l) + " " + str(r))
        # Check base case
        if r > l and len(array) > 1:

            mid = l + (r - l) // 2
            print("mid " + str(mid))
            # If element is present at the middle itself
            self.solver.push()
            self.solver.add(array[:mid])
            if self.solver.check() == sat:
                return self.__binary_search_for_unsat(array[mid:], mid, r)
            else:
                self.solver.pop()
                return self.__binary_search_for_unsat(array[:mid], l, mid - 1)
        else:
            # Element is not present in the array
            print(self.solver.check())
            print(self.solver.check())
            return array

    def __find_unsat_node_assertion(self, node_assertions):
        unsat_assertions = []
        for curr_asser in node_assertions:
            self.solver.push()
            self.solver.add(curr_asser)
            if self.solver.check() == unsat:
                print(self.__convert_ids(curr_asser))
                unsat_assertions.append(str(curr_asser))
                self.solver.pop()
        return unsat_assertions

    def __convert_assertions_to_str(self, node_assertions):
        assertions = []
        for curr_asser in node_assertions:
            # assertions.append(str(curr_asser))
            assertions.append(self.__convert_ids(curr_asser))
        return assertions


    def __convert_ids(self, expr: ExprRef):
        BINARY_OPERATOR = "({left} {b_op} {right})"
        UNARY_OPERATOR = "({u_op} {expr})"
        res = str(expr) + " ola"
        if expr.num_args() == 0:
            arr = str(expr).split("_")
            res = "None" if arr[0] == "-1" else arr[0]
            if len(arr) > 1:
                if arr[0] != "node":
                    res = self.map_ports[arr[0]] + " Port " + arr[1]
                else:
                    res = "Property " + arr[1]
            return res
        else:
            children = expr.children()
            decl = str(expr.decl())
            if decl in ["==", "!=", "<", "<=", ">", ">=", "+", "-", "*", "/"]:
                return BINARY_OPERATOR.format(left=self.__convert_ids(children[0]), b_op=decl, right=self.__convert_ids(children[1]))
            elif decl == "Not":
                return UNARY_OPERATOR.format(u_op="~", expr=self.__convert_ids(children[0]))
            elif decl == "And":
                return BINARY_OPERATOR.format(left=self.__convert_ids(children[0]), b_op="&&", right=self.__convert_ids(children[1]))
            elif decl == "Or":
                return BINARY_OPERATOR.format(left=self.__convert_ids(children[0]), b_op="||", right=self.__convert_ids(children[1]))
            elif decl == "Implies":
                return BINARY_OPERATOR.format(left=self.__convert_ids(children[0]), b_op="-->", right=self.__convert_ids(children[1]))
            elif decl in ["ToInt", "ToReal"]:
                return self.__convert_ids(children[0])


