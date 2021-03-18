from mlvp.codegen.ParseJSON import ParseJSON
from mlvp.codegen.CodeGen import CodeGen
from mlvp.typecheck.TypeChecker import TypeChecker


def generate_code(diagram, file_name="mlvp-code-output"):
    parser = ParseJSON(json_diagram=diagram)
    libraries, roots = parser.parse()
    codegen = CodeGen(file_name, libraries, roots)
    return codegen.generate_code()


def pipeline_verification(diagram):
    parser = ParseJSON(json_diagram=diagram)
    _, roots = parser.parse()
    type_checker = TypeChecker(roots)
    response = type_checker.verify()
    print(response)
    return str(response)
