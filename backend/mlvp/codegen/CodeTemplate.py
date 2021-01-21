IMPORT_LIB = "import {lib_name} as {lib_var}\n"

LOAD_CSV = "{var} = {pandas_var}.read_csv(\'./{file_name}\')\n"

RANDOM_FOREST_INIT = "{var} = RandomForestClassifier(numTrees={num_trees}, criterion=\"{criterion}\", max_depth={max_depth})\n"
MODE_FIT = "{var}.fit({x},{y})\n"
