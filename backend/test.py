import importlib
# Load "module.submodule.MyClass"
MyClass = getattr(importlib.import_module("mlvp.nodes"), "AbstractDataset")
# # Instantiate the class (pass arguments to the constructor, if needed)
instance = MyClass("a", "title", 2, 4)

print(instance.num_rows)
