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

TRAIN_TEST_SPLIT_CALL = "{x_train}, {x_test}, {y_train}, {y_test} = train_test_split({x}, {y}, test_size={test_size}, train_size={train_size}, shuffle={shuffle})\n"

ACCURACY_SCORE_CALL = "accuracy_score({y_true}, {y_pred})\n"

SAMPLER_INIT = "{var} = {sampler}(random_state={random_state})\n"
FIT_RESAMPLE = "{x_res}, {y_res} = {var}.fit_resample({x}, {y})\n"
