import sys
import os

CATEGORY_CONFIG = "CATEGORY_CONFIG"
NODE_CONFIG = "TEMPLATE_CONFIG_VAR"
NODE_CODENAME = "TemplateCodeName"
NODE_NAME = "TemplateName"
FROM_IMPORT = "from .{code_name} import {code_name}\n"

def create_node(input_fp, output_fp, category, name, code_name, node_config_var):
    print(output_fp)
    # print(file_name)
    input_file = open(input_fp, "r")
    # name = os.path.basename(path)

    output_file = open(output_fp, "w")

    text = input_file.read()
    text = text.replace(CATEGORY_CONFIG, category + "_CONFIG")
    text = text.replace(NODE_CONFIG, node_config_var)
    text = text.replace(NODE_CODENAME, code_name)
    text = text.replace(NODE_NAME, name)

    output_file.write(text)
    output_file.close()


def main():
    category = sys.argv[1].replace(" ", "_")
    category = category.upper()
    print("category: " + category)

    code_name = sys.argv[2].replace(" ", "")
    node_config_var = sys.argv[2].replace(" ", "_")
    node_config_var = node_config_var.upper()

    print("name: " + sys.argv[2])
    print("code_name: " + code_name)
    print("node_config_var: " + node_config_var)

    template_directory = './node-creator'
    category_ts = category.lower().replace("_", "-")
    node_folder_ts = node_config_var.lower().replace("_", "-")
    output_directory_ts = "./src/components/nodes/" + category_ts + "/" + node_folder_ts
    category_py = category.lower()
    output_directory_py = "./backend/mlvp/graph/nodes/" + category_py
    if not os.path.exists(output_directory_ts):
        os.makedirs(output_directory_ts)
    if not os.path.exists(output_directory_py):
        os.makedirs(output_directory_py)
    # iterate over files in
    # that directory
    print("Generated files at:")
    for file_name in os.listdir(template_directory):
        input_fp = os.path.join(template_directory, file_name)
        if ".py" in file_name:
            init_file = open(output_directory_py + "/__init__.py" , "a+")
            init_file.write(FROM_IMPORT.format(code_name=code_name))
            init_file.close()
            output_fp = output_directory_py + "/" + code_name + file_name
        else:
            output_fp = output_directory_ts + "/" + code_name + file_name
        # checking if it is a file
        if os.path.isfile(input_fp):
            create_node(input_fp, output_fp, category, sys.argv[2], code_name, node_config_var)


if __name__ == "__main__":
    main()
