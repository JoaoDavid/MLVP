from mlvp.codegen.CodeGenerator import CodeGenerator


def generate_code(diagram, file_name="mlvp-code-output"):
    for layer in diagram['layers']:
        if layer['type'] == 'diagram-links':
            links = layer['models']
        elif layer['type'] == 'diagram-nodes':
            nodes = layer['models']
    codegen = CodeGenerator(links, nodes, file_name, int(diagram['numTiers']))
    return codegen.generate_code()
