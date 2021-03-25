from mlvp.ast.ParseJSON import ParseJSON
from mlvp.codegen.CodeGen import CodeGen
from mlvp.typecheck.TypeChecker import TypeChecker


def generate_code(diagram, file_name="mlvp-code-output"):
    parser = ParseJSON(json_diagram=diagram)
    roots = parser.parse()
    codegen = CodeGen(file_name, roots)
    return codegen.generate_code()


def pipeline_verification(diagram):
    parser = ParseJSON(json_diagram=diagram)
    roots = parser.parse()
    type_checker = TypeChecker(roots)
    response = type_checker.verify()
    print(response)
    return str(response)
