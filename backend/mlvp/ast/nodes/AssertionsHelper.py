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
