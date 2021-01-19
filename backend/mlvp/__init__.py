from mlvp.codegen.CodeGenerator import CodeGenerator


def parse(diagram):
    for layer in diagram['layers']:
        if layer['type'] == 'diagram-links':
            links = layer['models']
        elif layer['type'] == 'diagram-nodes':
            nodes = layer['models']
    codegen = CodeGenerator(links, nodes, "mlvp-code-output")
    return codegen.generate_code()
