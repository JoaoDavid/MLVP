from mlvp.graph.Parser import Parser
from mlvp.graph.TopologicalSorter import TopologicalSorter
from mlvp.codegen.CodeGen import CodeGen
from mlvp.typecheck.DataFlow import DataFlow
from mlvp.typecheck.TypeChecker import TypeChecker


def pipeline_compilation(diagram, file_name="mlvp-code-output"):
    parser = Parser(json_diagram=diagram)
    roots, loose = parser.parse()
    topo_sorter = TopologicalSorter(roots, loose)
    sorted_nodes, sorted_loose_nodes = topo_sorter.topological_sort()
    data_flow = DataFlow(sorted_nodes, sorted_loose_nodes)
    data_res = data_flow.pass_data()
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
    return {**response, **data_res, **tc_res}


def pipeline_verification(diagram):
    parser = Parser(json_diagram=diagram)
    roots, loose = parser.parse()
    topo_sorter = TopologicalSorter(roots, loose)
    sorted_nodes, sorted_loose_nodes = topo_sorter.topological_sort()
    data_flow = DataFlow(sorted_nodes, sorted_loose_nodes)
    data_res = data_flow.pass_data()
    type_checker = TypeChecker(sorted_nodes, sorted_loose_nodes)
    tc_res = type_checker.verify()
    return {**data_res, **tc_res}


def pipeline_data_flow(diagram):
    parser = Parser(json_diagram=diagram)
    roots, loose = parser.parse()
    topo_sorter = TopologicalSorter(roots, loose)
    sorted_nodes, sorted_loose_nodes = topo_sorter.topological_sort()
    data_flow = DataFlow(sorted_nodes, sorted_loose_nodes)
    data_res = data_flow.pass_data()
    return data_res
