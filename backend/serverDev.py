from flask import Flask, request
from flask_cors import CORS
from waitress import serve
from mlvp import generate_code, pipeline_verification

app = Flask(__name__)
CORS(app)


@app.route('/codegen', methods=['POST'])
def codegen():
    data = request.json
    response = generate_code(data)
    return response


@app.route('/z3', methods=['POST'])
def z3():
    data = request.json
    response = pipeline_verification(data)
    return response


serve(app, host="127.0.0.1", port=8080)
