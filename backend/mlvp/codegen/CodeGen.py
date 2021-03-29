from mlvp.codegen.Emitter import Emitter
from mlvp.ast.nodes import Node

IMPORT_AS = "import {lib_name} as {lib_var}\n"
FROM_IMPORT = "from {package} import {class_to_import}\n"


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
            if root.is_root:
                self.__gather_libraries(root)
        print(self.libraries)
        for lib in self.libraries:
            self.out_file.write(lib)
        self.out_file.write("\n\n")

    def generate_code(self):
        self.__write_imports()
        for root in self.roots:
            if root.is_root:
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
            # node's parents are all visited and written
            # write current node code to the out file
            node.codegen(self.emitter, self.out_file)
            self.out_file.write("\n")
            # visit every child node
            for child in node.children:
                self.__write_nodes(child)
