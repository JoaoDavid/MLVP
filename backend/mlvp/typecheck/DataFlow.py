from mlvp.graph import DatasetPort


class DataFlow:

    def __init__(self, sorted_nodes, sorted_loose_nodes):
        self.sorted_nodes = sorted_nodes
        self.sorted_loose_nodes = sorted_loose_nodes
        self.node_columns = {}

    def pass_data(self):
        for node in self.sorted_nodes:
            self.__pass_data_aux(node)

        for loose in self.sorted_loose_nodes:
            self.__pass_data_aux(loose)

        result = {"nodeColumns": self.node_columns}
        return result

    def __pass_data_aux(self, node):
        # pass data from parent's output port
        # to the current node's input port
        for parent_link in node.parent_links:
            if isinstance(parent_link.source_port, DatasetPort):
                parent_link.target_port.columns = parent_link.source_port.columns
                parent_link.target_port.encoded_columns = parent_link.source_port.encoded_columns
        # sent data to current node's output port
        node.data_flow(self.node_columns)
