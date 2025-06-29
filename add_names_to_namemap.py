import os
import yaml
import json
from unidecode import unidecode

NAME_MAP_PATH = r'c:\DEV\chessfed\wp-content\plugins\table-plugin\src\nameMap.json'
YEARS_DIR = r'c:\DEV\chessfed\wp-content\plugins\cempionatu-lentele\years'

def load_name_map(path):
    if not os.path.isfile(path):
        with open(path, 'w', encoding='utf-8') as f:
            f.write('{}')
    with open(path, encoding='utf-8') as f:
        mapping = json.load(f)
    return mapping

def extract_names_from_yaml(yaml_data):
    names = set()
    def add_name(n):
        if n: names.add(n.strip())
    if isinstance(yaml_data, dict):
        for k, v in yaml_data.items():
            if k in ('winners', 'women_winners', 'ltu_women_winners'):
                for winner in v or []:
                    add_name(winner.get('name'))
            elif k in ('team_winners',):
                for team in v or []:
                    for member in team.get('members', []):
                        add_name(member)
            else:
                extract = extract_names_from_yaml(v)
                names.update(extract)
    elif isinstance(yaml_data, list):
        for item in yaml_data:
            names.update(extract_names_from_yaml(item))
    return names

def main():
    start_year = None  # Set to an integer (e.g., 2023) to filter by year, or None for all years

    name_map = load_name_map(NAME_MAP_PATH)
    existing_keys = set(name_map.keys())

    all_names = set()
    for fname in os.listdir(YEARS_DIR):
        if fname.endswith('.yaml'):
            if start_year is not None:
                try:
                    year = int(fname[:4])
                    if year < start_year:
                        continue
                except Exception:
                    pass
            with open(os.path.join(YEARS_DIR, fname), encoding='utf-8') as f:
                data = yaml.safe_load(f)
            all_names.update(extract_names_from_yaml(data))

    new_entries = {}
    for name in sorted(all_names):
        name_ascii = unidecode(name)
        if name == name_ascii:
            continue
        if name_ascii in existing_keys:
            continue
        new_entries[name_ascii] = name

    if new_entries:
        name_map.update(new_entries)
        with open(NAME_MAP_PATH, 'w', encoding='utf-8') as f:
            json.dump(name_map, f, ensure_ascii=False, indent=2)
        print(f"Added {len(new_entries)} new entries to nameMap.json")
    else:
        print("No new entries to add.")

if __name__ == "__main__":
    main()
