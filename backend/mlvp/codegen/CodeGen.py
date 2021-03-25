from mlvp.codegen.Emitter import Emitter
from mlvp.ast.nodes import Node


class CodeGen:

    def __init__(self, name, roots):
        self.name = name + ".py"
        self.libraries = set()
        self.roots = roots
        self.out_file = open(self.name, "w+")
        self.emitter = Emitter()

    def __gather_libraries(self, node: Node):
        self.libraries.add(node.import_dependency())
        # visit every child node
        for child in node.children:
            self.__gather_libraries(child)

    def __write_imports(self):
        for root in self.roots:
            self.__gather_libraries(root)
        for lib in self.libraries:
            self.out_file.write(lib)
        self.out_file.write("\n\n")

    def generate_code(self):
        self.__write_imports()
        for root in self.roots:
            self.__write_nodes(root)

        self.out_file.close()
        final_file = open(self.name, "r")
        file_text = final_file.read()
        final_file.close()
        return file_text

    def __write_nodes(self, node: Node):
        if not node.visited:
            node.visited = True
            for parent_link in node.parent_links:
                self.__write_nodes(parent_link.parent_node)
            # parents are all visited
            print(node.__class__.__name__)
            # write current node code to the out file
            node.codegen(self.emitter, self.out_file)
            self.out_file.write("\n")
            # visit every child node
            for child in node.children:
                self.__write_nodes(child)
