from mlvp.codegen.ParseJSON import ParseJSON
from mlvp.codegen.CodeGen import CodeGen
from mlvp.prover.ValidateLinks import ValidateLinks
from mlvp.prover.Verification import Verification


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


def pipeline_verification(data):
    verification = Verification(request=data)
    response = verification.verify()
    # print(response)
    return str(response)
