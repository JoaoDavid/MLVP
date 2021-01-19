from mlvp.codegen.CodeGenerator import CodeGenerator
from mlvp.codegen.TopoSort import get_layers


def parse(diagram):
    for layer in diagram['layers']:
        if layer['type'] == 'diagram-links':
            links = layer['models']
        elif layer['type'] == 'diagram-nodes':
            nodes = layer['models']


    layers = get_layers(nodes)
    codegen = CodeGenerator("mlvp-code-output")
    return codegen.generate_code()
