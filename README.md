# chessfed

Čempionatų lentelių informacija šiuo metu saugoma atskirų metų YAML failuose: `wp-content\plugins\cempionatu-lentele\years\` direktorijoje

Skriptas convert_yamls_to_main_json sukuria JSON failą (`wp-content\plugins\cempionatu-lentele\LSF_varzybu_istorija.json`), kuris įkeliamas į chessfed serverį su atitinkamu path.

Paleidimas:
`python wp-content/plugins/cempionatu-lentele/convert_yamls_to_main_json.py`