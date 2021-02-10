from flask import Flask, request
from flask_cors import CORS
from waitress import serve

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    response = "generate_code(data)"
    return response

@app.route('/codegen', methods=['POST'])
def foo():
    data = request.json
    print("here")
    response = "generate_code(data)"
    return response


serve(app, host="127.0.0.1", port=8080)
