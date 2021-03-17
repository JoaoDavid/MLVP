
class Emitter:

    def __init__(self):
        self.counter = 0
        self.variables = {}

    def get_count(self):
        self.counter += 1
        return self.counter

    def set(self, node_id, variable):
        self.variables[node_id] = variable

    def get(self, node_id):
        return self.variables[node_id]
