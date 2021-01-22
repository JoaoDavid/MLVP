
class Emitter:

    def __init__(self):
        self.counter = 0
        self.variables = {}

    def get_count(self):
        self.counter += 1
        return self.counter

    def set(self, statement_id, variable):
        self.variables[statement_id] = variable

    def get(self, statement_id):
        print(self.variables)
        return self.variables[statement_id]
