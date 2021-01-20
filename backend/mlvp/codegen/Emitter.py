
class Emitter:

    def __init__(self):
        self.counter = 0

    def get_count(self):
        self.counter += 1
        return self.counter
