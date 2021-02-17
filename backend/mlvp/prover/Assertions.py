from z3 import *


# And(func(a),func2(b,c,d),link(a,b))
# a_nrows == b_rows
# a_ncols== b_cols

def import_from_csv(id_output: str, n_cols: int, n_rows: int, labels: dict[str, int]):
    cols = Int(id_output + "_n_cols")
    rows = Int(id_output + "_n_rows")
    return And(cols == n_cols, rows == n_rows)


def split_dataset(id_input, id_output_train, id_output_test, test_size, train_size, shuffle):
    cols_input = Int(id_input + "_n_cols")
    rows_input = Int(id_input + "_n_rows")
    cols_output_train = Int(id_output_train + "_n_cols")
    rows_output_train = Int(id_output_train + "_n_rows")
    cols_output_test = Int(id_output_test + "_n_cols")
    rows_output_test = Int(id_output_test + "_n_rows")
    shuffle_input = Bool(id_input + "_shuffled")
    shuffle_output_train = Bool(id_output_train + "_shuffled")
    shuffle_output_test = Bool(id_output_test + "_shuffled")
    output_shuffles = Or(shuffle_input, shuffle)
    return And(
        rows_output_train == ToInt(ToReal(rows_input) * train_size),
        rows_output_test == ToInt(ToReal(rows_input) * test_size),
        cols_input == cols_output_train,
        cols_output_train == cols_output_test,
        shuffle_output_train == output_shuffles,
        shuffle_output_test == output_shuffles
    )


# mais de duas rows e mais de 3 colunas
def func3(id_input):
    cols = Int(id_input + "_n_cols")
    rows = Int(id_input + "_n_rows")
    return And(cols > 3, rows > 2)
