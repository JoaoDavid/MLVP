from mlvp.codegen.ParseJSON import ParseJSON
from mlvp.codegen.CodeGen import CodeGen
from mlvp.typecheck.ValidateLinks import ValidateLinks
from mlvp.typecheck.Typecheck import Verification


def generate_code(diagram, file_name="mlvp-code-output"):
    parser = ParseJSON(json_diagram=diagram)
    libraries, roots = parser.parse()
    codegen = CodeGen(file_name, libraries, roots)
    return codegen.generate_code()


def validate_links(data):
    validator = ValidateLinks(links_data=data)
    response = validator.validate()
    # print(response)
    return response


def pipeline_verification(diagram):
    parser = ParseJSON(json_diagram=diagram)
    _, roots = parser.parse()
    verification = Verification(roots)
    response = verification.verify()
    print(response)
    return str(response)
