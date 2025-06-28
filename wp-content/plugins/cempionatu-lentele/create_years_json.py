import json
import os

base_dir = os.path.dirname(__file__)
main_file = os.path.join(base_dir, 'LSF_varzybu_istorija.json')
years_dir = os.path.join(base_dir, 'years')

os.makedirs(years_dir, exist_ok=True)

with open(main_file, encoding='utf-8') as f:
    data = json.load(f)

for entry in data:
    year = entry.get('year')
    tournaments = entry.get('tournaments', [])
    if year:
        out_path = os.path.join(years_dir, f"{year}.json")
        with open(out_path, 'w', encoding='utf-8') as out:
            json.dump({"year": year, "tournaments": tournaments}, out, ensure_ascii=False, indent=2)
        print(f"Extracted {len(tournaments)} tournaments for year {year} to {out_path}")
