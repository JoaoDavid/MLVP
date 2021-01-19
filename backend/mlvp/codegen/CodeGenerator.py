from mlvp.codegen.CodeTemplate import *


class CodeGenerator:

    def __init__(self, name):
        self.name = name + ".py"
        self.outFile = open(self.name, "w+")
        self.counter = 0

    def __write_imports(self):
        self.outFile.write(IMPORT_LIB.format(lib_name="pandas", lib_var="pd"))

    def generate_code(self):
        self.__write_imports()
        # some code
        self.outFile.close()
        finalFile = open(self.name, "r")
        fileText = finalFile.read()
        finalFile.close()
        return fileText
