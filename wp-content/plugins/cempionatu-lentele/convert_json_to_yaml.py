import os
import json
import glob
import yaml

class IndentDumper(yaml.SafeDumper):
    def increase_indent(self, flow=False, indentless=False):
        return super().increase_indent(flow, False)

    def represent_str(self, data):
        # Only quote strings that are not numbers
        if data.isdigit():
            return self.represent_int(int(data))
        return super().represent_str(data)

IndentDumper.add_representer(str, IndentDumper.represent_str)

def convert_json_to_yaml(json_path, yaml_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    with open(yaml_path, 'w', encoding='utf-8') as f:
        yaml.dump(
            data,
            f,
            allow_unicode=True,
            sort_keys=False,
            indent=2,
            default_flow_style=False,
            Dumper=IndentDumper
        )

def main():
    years_dir = os.path.join(os.path.dirname(__file__), 'years')
    for json_file in glob.glob(os.path.join(years_dir, '*.json')):
        yaml_file = os.path.splitext(json_file)[0] + '.yaml'
        convert_json_to_yaml(json_file, yaml_file)
        print(f'Converted {json_file} -> {yaml_file}')

if __name__ == '__main__':
    main()
