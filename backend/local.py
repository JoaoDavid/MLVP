from mlvp import generate_code, generate_code_version2
import json
import sys

print(sys.argv)
file = open(sys.argv[1], "r")
content = file.read()

y = json.loads(content)

# generate_code(y)
generate_code_version2(y)