import sys

from flask import Flask, request
from flask_cors import CORS
from waitress import serve
from mlvp import pipeline_compilation, pipeline_verification, pipeline_data_flow

sys.settrace
# DEBUG SEG FAULT
# gdb python
# (gdb) run ./serverDev.py
# wait for segfault ##
# (gdb) backtrace
# stack trace of the c code

app = Flask(__name__)
CORS(app)


@app.route('/compile', methods=['POST'])
def codegen():
    print("compile req")
    data = request.json
    response = pipeline_compilation(data)
    return response


@app.route('/typeCheck', methods=['POST'])
def type_check():
    print("typeCheck req")
    data = request.json
    response = pipeline_verification(data)
    return response


@app.route('/dataFlow', methods=['POST'])
def data_flow():
    print("dataFlow req")
    data = request.json
    response = pipeline_data_flow(data)
    return response


serve(app, host="127.0.0.1", port=8080)
