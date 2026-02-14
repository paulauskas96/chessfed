# python convert_yamls_to_main_json.py
import os
import glob
import yaml
import json

def main():
    base_dir = os.path.dirname(__file__)
    years_dir = os.path.join(base_dir, 'years')
    output_file = os.path.join(base_dir, 'LSF_varzybu_istorija.json')

    # Read and parse all YAML files, store their data in a list
    yaml_files = glob.glob(os.path.join(years_dir, '*.yaml'))
    all_years = []
    for yaml_file in yaml_files:
        with open(yaml_file, 'r', encoding='utf-8') as f:
            year_data = yaml.safe_load(f)
            all_years.append(year_data)
    # Sort by year descendingly
    all_years.sort(key=lambda x: x.get('year', 0), reverse=True)
    # Write the merged data to a single JSON file
    with open(output_file, 'w', encoding='utf-8') as out:
        json.dump(all_years, out, ensure_ascii=False, indent=2)
    print(f"Joined {len(yaml_files)} year YAML files into {output_file} (sorted by year descendingly)")

if __name__ == '__main__':
    main()
