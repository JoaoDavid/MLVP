from mlvp.codegen import *
from mlvp.graph.nodes.Node import *
from mlvp.typecheck import *

TRAIN_TEST_SPLIT_CALL = "{x_train}, {x_test}, {y_train}, {y_test} = train_test_split({x}, {y}, test_size={test_size}, train_size={train_size}, shuffle={shuffle})\n"


class SplitDataset(Node):

    def __init__(self, data):
        super().__init__(data)
        self.test_size = data['testSize']
        self.train_size = data['trainSize']
        self.shuffle = data['shuffle']
        self.stratify_by_class = data['stratifyByClass']

    def import_dependency(self):
        return FROM_IMPORT.format(package="sklearn.model_selection", class_to_import="train_test_split")

    def codegen(self, emitter: Emitter, out_file):
        curr_count = emitter.get_count()
        parent_port = self.parent_links[0].source_port
        x, y = emitter.get(parent_port)
        x_train = x + "_train" + str(curr_count)
        y_train = y + "_train" + str(curr_count)
        x_test = x + "_test" + str(curr_count)
        y_test = y + "_test" + str(curr_count)
        out_file.write(TRAIN_TEST_SPLIT_CALL.format(x_train=x_train, x_test=x_test, y_train=y_train, y_test=y_test, x=x,
                                                    y=y, test_size=self.test_size, train_size=self.train_size,
                                                    shuffle=self.shuffle))
        out_train_ds = self.get_port(False, "Train Dataset")
        out_test_ds = self.get_port(False, "Test Dataset")
        emitter.set(out_train_ds, (x_train, y_train))
        emitter.set(out_test_ds, (x_test, y_test))

    def assertions(self, node_columns):
        input_port = self.get_port(True, "Dataset")
        output_train_port = self.get_port(False, "Train Dataset")
        output_test_port = self.get_port(False, "Test Dataset")

        output_train_port.columns = input_port.columns
        output_test_port.columns = input_port.columns

        input_ds = Dataset(input_port.port_id)
        train_ds = Dataset(output_train_port.port_id)
        test_ds = Dataset(output_test_port.port_id)

        shuffle_input = Bool(PORT_PROP.format(id_port=input_port.port_id, name="shuffled"))
        shuffle_train = Bool(PORT_PROP.format(id_port=output_train_port.port_id, name="shuffled"))
        shuffle_test = Bool(PORT_PROP.format(id_port=output_test_port.port_id, name="shuffled"))
        z3_shuffle = Bool(NODE_PROP.format(name="shuffle", node_id=self.node_id))
        output_shuffles = Or(shuffle_input, z3_shuffle)
        z3_stratify_by_class = Bool(NODE_PROP.format(name="stratify_by_class", node_id=self.node_id))

        return [
            # requires
            input_ds.rows >= 2,
            # falta relacionar os min e max label count
            # ensures
            train_ds.rows == ToInt(ToReal(input_ds.rows) * self.train_size),
            test_ds.rows == ToInt(ToReal(input_ds.rows) * self.test_size),
            input_ds.cols == train_ds.cols,
            train_ds.cols == test_ds.cols,
            input_ds.dataset == train_ds.dataset,
            input_ds.dataset == test_ds.dataset,
            train_ds.n_labels == ToInt(ToReal(input_ds.n_labels) * self.train_size),
            test_ds.n_labels == ToInt(ToReal(input_ds.n_labels) * self.test_size),
            z3_stratify_by_class == self.stratify_by_class,  # TODO rever
            Implies(z3_stratify_by_class, And(train_ds.balanced, test_ds.balanced)),
            z3_shuffle == self.shuffle,
            shuffle_train == output_shuffles,
            shuffle_test == output_shuffles,
            Implies(input_ds.time_series, Not(And(z3_shuffle, z3_stratify_by_class))),
        ]
