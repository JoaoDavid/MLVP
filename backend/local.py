from mlvp import parse
import json
import sys

print(sys.argv)
file = open(sys.argv[1], "r")
content = file.read()

y = json.loads(content)

parse(y)
