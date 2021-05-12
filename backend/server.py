from flask import Flask, request
from flask_cors import CORS
from waitress import serve
from mlvp import pipeline_compilation, pipeline_verification, pipeline_data_flow

app = Flask(__name__)
CORS(app)


@app.route('/compile', methods=['POST'])
def codegen():
    data = request.json
    response = pipeline_compilation(data)
    return response


@app.route('/typeCheck', methods=['POST'])
def type_check():
    data = request.json
    response = pipeline_verification(data)
    return response


@app.route('/dataFlow', methods=['POST'])
def data_flow():
    data = request.json
    response = pipeline_data_flow(data)
    return response


serve(app, host="194.117.20.237", port=443)
