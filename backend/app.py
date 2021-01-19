from flask import Flask, request, jsonify
from flask_cors import CORS
from mlvp import parse

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return 'Hello World!'


@app.route('/posts', methods=['GET'])
def getjson():
    response = jsonify({
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et susciit recusandae consequuntur expedita enderit molestiaet autem sunt rem eveniet architecto",
    })
    return response


@app.route('/codegen', methods=['POST'])
def foo():
    data = request.json
    response = parse(data)
    return response


app.run(port=5000)
