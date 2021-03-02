from flask import Flask, request
from flask_cors import CORS
from waitress import serve
from mlvp import generate_code, validate_links

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
    response = validate_links(data)
    return response


serve(app, host="194.117.20.237", port=443)
