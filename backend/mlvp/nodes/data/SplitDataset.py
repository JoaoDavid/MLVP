from mlvp.nodes.Node import Node
from mlvp.typecheck import Dataset, SEP, SHUFFLED
from z3 import *


class SplitDataset(Node):

    def __init__(self, node_id: str, title: str, test_size, train_size, shuffle):
        super().__init__(node_id, title)
        self.test_size = test_size
        self.train_size = train_size
        self.shuffle = shuffle

    def type_check(self):
        id_input = self.get_port(True, "Dataset").port_id
        id_output_train = self.get_port(False, "Train Dataset").port_id
        id_output_test = self.get_port(False, "Test Dataset").port_id
        node_assertions = self.assertions(id_input, id_output_train, id_output_test, self.test_size,
                                          self.train_size, self.shuffle, True)
        return node_assertions

    def assertions(self, id_input, id_output_train, id_output_test, test_size, train_size, shuffle, stratify):
        input_ds = Dataset(id_input)
        train_ds = Dataset(id_output_train)
        test_ds = Dataset(id_output_test)

        shuffle_input = Bool(id_input + SEP + SHUFFLED)
        shuffle_train = Bool(id_output_train + SEP + SHUFFLED)
        shuffle_test = Bool(id_output_test + SEP + SHUFFLED)
        z3_shuffle = Bool("node" + SEP + "shuffle")
        output_shuffles = Or(shuffle_input, z3_shuffle)
        z3_stratify = Bool("node" + SEP + "stratify")

        return [
            # requires
            input_ds.rows >= 2,
            # falta relacionar os min e max label count
            # ensures
            train_ds.rows == ToInt(ToReal(input_ds.rows) * train_size),
            test_ds.rows == ToInt(ToReal(input_ds.rows) * test_size),
            input_ds.cols == train_ds.cols,
            train_ds.cols == test_ds.cols,
            train_ds.n_labels == ToInt(ToReal(input_ds.n_labels) * train_size),
            test_ds.n_labels == ToInt(ToReal(input_ds.n_labels) * test_size),
            z3_stratify == stratify,
            Implies(z3_stratify, And(train_ds.balanced, test_ds.balanced)),
            z3_shuffle == shuffle,
            shuffle_train == output_shuffles,
            shuffle_test == output_shuffles
        ]
