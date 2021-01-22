IMPORT_AS = "import {lib_name} as {lib_var}\n"
FROM_IMPORT = "from {package} import {class_to_import}\n"

LOAD_CSV = "{var} = {pandas_var}.read_csv(\'./{file_name}\')\n"
FEATURES = "{x} = {var}.drop(\'{target}\', axis=1)\n"
TARGET = "{y} = {var}[\'{target}\']\n"

RANDOM_FOREST_INIT = "{var} = RandomForestClassifier(n_estimators={num_trees}, criterion=\"{criterion}\", max_depth={max_depth})\n"
MODEL_FIT = "{var}.fit({x}, {y})\n"
MODEL_PREDICT = "{var} = {clf_var}.predict({x})\n"

SERIES_TO_LIST = "{series_var}.tolist()\n"
PRINT = "print({content})\n"
