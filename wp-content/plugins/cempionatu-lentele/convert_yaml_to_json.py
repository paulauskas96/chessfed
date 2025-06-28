import os
import glob
import yaml
import json

def convert_yaml_to_json(yaml_path, json_path):
    with open(yaml_path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def main():
    years_dir = os.path.join(os.path.dirname(__file__), 'years')
    for yaml_file in glob.glob(os.path.join(years_dir, '*.yaml')):
        json_file = os.path.splitext(yaml_file)[0] + '.json'
        convert_yaml_to_json(yaml_file, json_file)
        print(f'Converted {yaml_file} -> {json_file}')

if __name__ == '__main__':
    main()
