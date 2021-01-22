from flask import Flask, request, jsonify
from flask_cors import CORS
from mlvp import parse

app = Flask(__name__)
CORS(app)


@app.route('/codegen', methods=['POST'])
def foo():
    data = request.json
    response = parse(data)
    return response


app.run(port=5000)
