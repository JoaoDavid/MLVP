from mlvp.graph import DatasetPort


class DataFlow:

    def __init__(self, sorted_nodes, sorted_loose_nodes):
        self.sorted_nodes = sorted_nodes
        self.sorted_loose_nodes = sorted_loose_nodes
        self.node_columns = {}

    def pass_data(self):
        for node in self.sorted_nodes:
            self.__get_parents_data(node.parent_links)
            node.data_flow(self.node_columns)

        for loose in self.sorted_loose_nodes:
            self.__get_parents_data(loose.parent_links)
            loose.data_flow(self.node_columns)
        print(self.node_columns)
        result = {"nodeColumns": self.node_columns}
        return result

    def __get_parents_data(self, parent_links):
        for parent_link in parent_links:
            if isinstance(parent_link.source_port, DatasetPort):
                parent_link.target_port.columns = parent_link.source_port.columns
                parent_link.target_port.encoded_columns = parent_link.source_port.encoded_columns
                parent_link.target_port.categories = parent_link.source_port.categories
