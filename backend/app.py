from flask import Flask, request, jsonify
from flask_cors import CORS
from mlvp import generate_code

app = Flask(__name__)
CORS(app)


@app.route('/codegen', methods=['POST'])
def foo():
    data = request.json
    response = generate_code(data)
    return response


app.run(port=5000)
