from flask import Flask, request
from flask_cors import CORS
from waitress import serve
from mlvp import generate_code

app = Flask(__name__)
CORS(app)


@app.route('/codegen', methods=['POST'])
def codegen():
    data = request.json
    response = generate_code(data)
    return response


serve(app, host="127.0.0.1", port=8080)