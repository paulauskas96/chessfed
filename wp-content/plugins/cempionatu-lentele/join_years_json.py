import json
import os
import glob

base_dir = os.path.dirname(__file__)
output_file = os.path.join(base_dir, 'LSF_varzybu_istorija.json')
years_dir = os.path.join(base_dir, 'years')

year_files = sorted(glob.glob(os.path.join(years_dir, '*.json')))
all_years = []

for yf in year_files:
    with open(yf, encoding='utf-8') as f:
        year_data = json.load(f)
        all_years.append(year_data)

# Sort by year descendingly
all_years.sort(key=lambda x: x.get('year', 0), reverse=True)

with open(output_file, 'w', encoding='utf-8') as out:
    json.dump(all_years, out, ensure_ascii=False, indent=2)

print(f"Joined {len(year_files)} year files into {output_file} (sorted by year descendingly)")
