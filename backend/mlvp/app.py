import json

from mlvp.graph.ParseJSON import ParseJSON
from mlvp.graph.TopologicalSorter import TopologicalSorter
from mlvp.codegen.CodeGen import CodeGen
from mlvp.typecheck.TypeChecker import TypeChecker


def generate_code(diagram, file_name="mlvp-code-output"):
    parser = ParseJSON(json_diagram=diagram)
    roots, loose = parser.parse()
    topo_sorter = TopologicalSorter(roots, loose)
    sorted_nodes, sorted_loose_nodes = topo_sorter.topological_sort()
    type_checker = TypeChecker(sorted_nodes, sorted_loose_nodes)
    tc_res = type_checker.verify(strong_type_check=True)

    response = {}
    if tc_res['canLink']:
        codegen = CodeGen(file_name, sorted_nodes)
        code = codegen.generate_code()
        response["successful"] = True
        response["code"] = code
    else:
        response["successful"] = False
    # print(response)
    # return json.dumps(response, indent=4)
    return {**response, **tc_res}


def pipeline_verification(diagram):
    parser = ParseJSON(json_diagram=diagram)
    roots, loose = parser.parse()
    topo_sorter = TopologicalSorter(roots, loose)
    sorted_nodes, sorted_loose_nodes = topo_sorter.topological_sort()
    type_checker = TypeChecker(sorted_nodes, sorted_loose_nodes)
    response = type_checker.verify()
    # print(response)
    return json.dumps(response, indent=4)
