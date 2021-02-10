from flask import Flask, request
from flask_cors import CORS
from mlvp import generate_code

app = Flask(__name__)
CORS(app)


@app.route('/codegen', methods=['POST'])
def foo():
    data = request.json
    response = generate_code(data)
    return response


if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
