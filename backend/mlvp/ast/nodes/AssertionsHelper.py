from z3 import *

from mlvp.typecheck import get_col_type, column


def no_features_of_type(input_port, col_type, dataset):
    features_assertions = []
    if len(input_port.columns) > 0:
        columns = list(input_port.columns.keys())
        columns.pop()
        column_names = [String(col) for col in columns]
        string_type = get_col_type(col_type)
        for i in range(len(columns)):
            features_assertions.append(Not(column(dataset, column_names[i]) == string_type))
    return features_assertions


def categorical_last_column(input_port, dataset):
    assertions = []
    if len(input_port.columns) > 0:
        columns = list(input_port.columns.keys())
        last_name = String(columns[-1])

        string_type = get_col_type("string")
        int_type = get_col_type("int")
        assertions.append(Or(column(dataset, last_name) == string_type, column(dataset, last_name) == int_type))
    return assertions


def continuous_last_column(input_port, dataset):
    assertions = []
    if len(input_port.columns) > 0:
        columns = list(input_port.columns.keys())
        last_name = String(columns[-1])

        float_type = get_col_type("float")
        int_type = get_col_type("int")
        assertions.append(Or(column(dataset, last_name) == float_type, column(dataset, last_name) == int_type))
    return assertions
