from src.mlvp.codegen.CodeGenerator import CodeGenerator


def mlvp(diagram):
    for layer in diagram['layers']:
        if layer['type'] == 'diagram-links':
            links = layer
        elif layer['type'] == 'diagram-nodes':
            nodes = layer

    print(links)
    codegen = CodeGenerator("mlvp-code")
    return codegen.generate_code()
