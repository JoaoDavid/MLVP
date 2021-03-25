import importlib
# Load "module.submodule.MyClass"
MyClass = getattr(importlib.import_module("mlvp.nodes"), "AbstractDataset")
# # Instantiate the class (pass arguments to the constructor, if needed)
instance = MyClass("a", "title", 2, 4)

print(instance.num_rows)

import glob
print(glob.glob("./*.py"))

from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir(".") if isfile(join(".", f))]
print(onlyfiles)

mylist = [f for f in glob.glob("*.py")]
print(mylist)