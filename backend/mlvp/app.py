import json

from mlvp.ast.ParseJSON import ParseJSON
from mlvp.codegen.CodeGen import CodeGen
from mlvp.typecheck.TypeChecker import TypeChecker


def generate_code(diagram, file_name="mlvp-code-output"):
    parser = ParseJSON(json_diagram=diagram)
    roots, loose = parser.parse()
    type_checker = TypeChecker(roots.copy(), loose)
    tc_res = type_checker.verify(compiling_next=True)
    # the type checker will set the nodes visited flag to True
    # we need to reset them before generating the code
    for root in roots:
        root.reset_visited()
    response = {}
    if tc_res['canLink']:
        codegen = CodeGen(file_name, roots)
        code = codegen.generate_code()
        response["successful"] = True
        response["code"] = code
        # print(code)
    else:
        response["successful"] = False
    # print(response)
    # return json.dumps(response, indent=4)
    return {**response, **tc_res}


def pipeline_verification(diagram):
    parser = ParseJSON(json_diagram=diagram)
    roots, loose = parser.parse()
    type_checker = TypeChecker(roots, loose)
    response = type_checker.verify()
    print(response)
    return json.dumps(response, indent=4)
