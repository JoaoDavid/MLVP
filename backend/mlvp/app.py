from mlvp.codegen.ParseJSON import ParseJSON
from mlvp.codegen.CodeGen import CodeGen


def generate_code(diagram, file_name="mlvp-code-output"):
    parser = ParseJSON(json_diagram=diagram)
    libraries, statements, roots = parser.parse()
    codegen = CodeGen(file_name, libraries, statements, roots)
    return codegen.generate_code()
