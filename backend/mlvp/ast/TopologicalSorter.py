class TopologicalSorter:

    def __init__(self, roots, loose):
        self.roots = roots
        self.loose = loose
        self.sorted_nodes = []
        self.sorted_loose_nodes = []

    def topological_sort(self):
        for root in self.roots:
            self.__traverse_graph(root, self.sorted_nodes)
        for loose in self.loose:
            self.__traverse_graph(loose, self.sorted_loose_nodes)
        return self.sorted_nodes, self.sorted_loose_nodes

    def __traverse_graph(self, node, sorted_array):
        if not node.visited:
            node.visited = True
            for parent_link in node.parent_links:
                self.__traverse_graph(parent_link.parent_node, sorted_array)
            # parents are all visited
            sorted_array.append(node)
            # visit every child node
            for child in node.children:
                self.__traverse_graph(child, sorted_array)
