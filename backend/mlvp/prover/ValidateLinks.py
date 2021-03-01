from mlvp.prover.Assertions import *


class ValidateLinks:

    def __init__(self, links_data):
        self.json_links_data = links_data

    def validate(self):
        print(str(self.json_links_data))
        return str(True)
