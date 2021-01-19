from mlvp.codegen.CodeGenerator import CodeGenerator
from mlvp.codegen.TopoSort import get_layers


def parse(diagram):
    for layer in diagram['layers']:
        if layer['type'] == 'diagram-links':
            links = layer
        elif layer['type'] == 'diagram-nodes':
            nodes = layer

    layers = get_layers(nodes)
    print(links)
    print(type(nodes))
    codegen = CodeGenerator("mlvp-code")
    return codegen.generate_code()
