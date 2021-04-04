import json

from mlvp.ast.ParseJSON import ParseJSON
from mlvp.codegen.CodeGen import CodeGen
from mlvp.typecheck.TypeChecker import TypeChecker


def generate_code(diagram, file_name="mlvp-code-output"):
    parser = ParseJSON(json_diagram=diagram)
    roots, loose = parser.parse()
    type_checker = TypeChecker(roots, loose)
    tc_res = type_checker.verify(True)
    response = {}
    if tc_res['canLink']:
        print(roots)
        codegen = CodeGen(file_name, roots)
        code = codegen.generate_code()
        response["successful"] = True
        response["code"] = code
        print(code)
    else:
        response["successful"] = False
    print(response)
    # return json.dumps(response, indent=4)
    return response


def pipeline_verification(diagram):
    parser = ParseJSON(json_diagram=diagram)
    roots, loose = parser.parse()
    type_checker = TypeChecker(roots, loose)
    response = type_checker.verify()
    print(response)
    return json.dumps(response, indent=4)
