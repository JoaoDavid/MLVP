from z3 import *

PORT_PROP = "{id_port}:{name}"


def link(id_source_port: str, id_target_port: str):
    id_source_port = Dataset(id_source_port)
    port_to = Dataset(id_target_port)

    return [
        id_source_port.cols == port_to.cols,
        id_source_port.rows == port_to.rows,
        id_source_port.balanced == port_to.balanced,
        id_source_port.time_series == port_to.time_series,
        id_source_port.n_labels == port_to.n_labels,
        id_source_port.max_label_count == port_to.max_label_count,
        id_source_port.min_label_count == port_to.min_label_count,
    ]


class Dataset:

    def __init__(self, id_port: str):
        self.cols = Int(PORT_PROP.format(id_port=id_port, name="n_cols"))
        self.rows = Int(PORT_PROP.format(id_port=id_port, name="n_rows"))
        self.n_labels = Int(PORT_PROP.format(id_port=id_port, name="n_labels"))
        self.max_label_count = Int(PORT_PROP.format(id_port=id_port, name="max_label_count"))
        self.min_label_count = Int(PORT_PROP.format(id_port=id_port, name="min_label_count"))
        self.balanced = Bool(PORT_PROP.format(id_port=id_port, name="balanced"))
        self.time_series = Bool(PORT_PROP.format(id_port=id_port, name="time_series"))
