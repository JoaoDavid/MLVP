from mlvp import parse
import json


file = open("mlvp-diagram.json", "r")
content = file.read()

y = json.loads(content)

parse(y)