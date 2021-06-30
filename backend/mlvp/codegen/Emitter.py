
class Emitter:

    def __init__(self):
        self.counter = 0
        self.variables = {}

    def get_count(self):
        self.counter += 1
        return self.counter

    def set(self, port, variable):
        self.variables[port] = variable

    def get(self, port):
        return self.variables[port]
