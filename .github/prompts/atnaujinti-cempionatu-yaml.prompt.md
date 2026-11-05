---
name: "Atnaujinti čempionatų YAML"
description: "Use when: updating Lithuanian chess championship YAML for a year, including blank or partially filled years."
argument-hint: "Metai, pvz. 2027"
agent: "agent"
---

Atnaujink Lietuvos šachmatų čempionatų duomenis metams: ${input:year}.

Tikslinis failas: `wp-content/plugins/cempionatu-lentele/years/${input:year}.yaml`.
Naudok `wp-content/plugins/cempionatu-lentele/years/2025.yaml` kaip įrašų struktūros ir aprėpties atskaitą, tačiau neperkelk pasenusių rezultatų ar nuorodų.
Prieš paiešką perskaityk [čempionatų apimties kontrolinį sąrašą](./cempionatu-yaml-apimtis.md).

## Darbo eiga

1. Jei tikslinis YAML jau yra, perskaityk ir išsaugok visus teisingus įrašus. Niekada netrink patvirtintų duomenų vien dėl to, kad šaltinis šiuo metu nerastas.
2. Pagal kontrolinį sąrašą ir tų metų LŠF kalendorių sudaryk galimų turnyrų sąrašą ir nustatyk, kurie iš jų jau įvyko:
   - pirmiausia naudok Lietuvos šachmatų federacijos (`chessfed.lt`) pranešimus ir varžybų kalendorių;
   - rezultatams, reitingams ir komandinėms sudėtims naudok oficialias `chess-results.com` lenteles;
   - naudok Lichess ar LiveChessCloud tik partijų nuorodoms.
3. Neįtrauk dar neįvykusių turnyrų. Jei LŠF kalendoriuje paskelbta būsima data, paminėk ją galutinėje suvestinėje, bet nekurk neišbaigto YAML įrašo.
4. Atnaujink arba papildyk visus patvirtintus įrašus pagal esamą YAML schemą:
   - kiekvienas individualus prizininkas turi turėti `place`, `name` ir, kai šaltinyje pateikiama, `city`;
   - `rating` įrašyk tik kai oficialioje galutinėje rezultatų lentelėje pateiktas skaitinis reitingas; jei žaidėjas yra be reitingo, `rating` lauką praleisk;
   - kiekvienai amžiaus grupei naudok jos konkretų `results_link`, vedantį į galutinę lentelę (`art=1` su galutinio rato `rd`), o ne į startinį sąrašą (`art=0`), bendrą ar kitos grupės lentelę;
   - jei suaugusiųjų čempionatas vyko vienu etapu, jo pavadinime ir `config.rank` nenaudok `Finalas`; naudok `rank: null`, o `open: true` nustatyk kai oficialus formatas yra atviras;
   - komandinių čempionatų kiekviena prizinė komanda turi turėti visą `members` sąrašą iš oficialaus „Team-Composition with round-results“ vaizdo (`art=1&turdet=YES`), įtraukiant visus sužaidusius žaidėjus; nespręsk sudėties pagal ankstesnių metų sąrašus, komandų poravimus ar kitus turnyrus;
   - atviruose suaugusiųjų turnyruose išsaugok ir bendros, ir moterų įskaitų prizininkus pagal 2025 m. modelį;
   - kiekvieną YAML prizininkų grupę (`winners`, `women_winners`, `ltu_winners`, `ltu_women_winners`, `team_winners`) nustatyk tik iš visos jai skirtos galutinės oficialios lentelės: pritaikyk šaltinyje nurodytą įskaitos filtrą (pvz., amžių, lytį, šalį ar komandą), išrikiuok pagal galutinę vietą ir paimk pirmas tris. Neapsiribok puslapio pradžia, daline ištrauka ar tarpine lentele; neperkelk prizininkų iš ankstesnio rato.
5. Normalizuok vardus prieš rašydamas YAML:
   - pirmiausia naudok tikslų atitikmenį iš `wp-content/plugins/table-plugin/src/nameMap.json`;
   - jei jo nėra, ieškok tokio paties asmens ankstesniuose `years/*.yaml` ir perimk jau naudotą lietuvišką rašybą;
   - jei atitikmens nėra nei vardų žemėlapyje, nei ankstesniuose YAML, palik oficialaus šaltinio vardą ir nespėliok diakritinių ženklų;
   - vardų ar pavardžių negalima gramatiškai kaitalioti ar „lietuvinti“ spėjant: nekeisk lyties galūnių ir nevartok naujos pavardės formos be vardų žemėlapio ar oficialaus šaltinio patvirtinimo;
   - neišmesk FIDE titulų (`GM`, `IM`, `WGM`, `WIM`, `FM`, `WFM`, `CM`, `WCM`) kai jie pateikti patikimame šaltinyje, bet visada pašalink internetinių „Arena“ titulų priešdėlius (`AGM`, `AIM`, `AFM`, `ACM`).
6. Užpildyk ir taisyk dalinius metus: ieškok trūkstamų reitingų, komandų narių, rezultatų nuorodų, amžiaus grupių ir Pirmos lygos finalo.

## Tikslumo reikalavimai

- Tikrink galutines, ne pradines, `Chess-Results` lenteles: `rd` turi sutapti su oficialiai sužaistų ratų skaičiumi, o puslapio antraštė turi rodyti „Final Ranking after N Rounds“, ne tarpinę lentelę.
- Išanalizuok visą kiekvienos įskaitos galutinę lentelę, ne tik ekrane ar įrankio išvestyje matomą jos dalį. Jei šaltinis sutrumpintas, atverk kitą jo dalį, naudok eksportą arba kitą oficialų pilną vaizdą; niekada nespėk jokio prizininko iš neišsamios ištraukos.
- Kiekvienam įrašomam prizininkui sutikrink `place`, vardą, reitingą, miestą ir, jei taikoma, `sex` su konkrečia galutinės lentelės eilute. Jei oficialus šaltinis yra prieštaringas ar nepakankamas, nekeisk esamų duomenų ir aiškiai nurodyk problemą.
- Sutikrink turnyro pavadinimą, datą, miestą, laiko kontrolę, grupę ir lytį su oficialiu šaltiniu.
- Išsaugok YAML formatavimą ir esamus laukų pavadinimus.
- Nenaudok `rating: 0`; nereitinguojamam žaidėjui šio lauko visai nepridėk.
- Nenaudok tuščių `members: []` sąrašų, spėjimų ar nepatvirtintų rezultatų.
- Neįtrauk kontroliniame sąraše esančių turnyrų, kol jie faktiškai neįvyko.

## Privaloma patikra

Po pakeitimų:

1. Išanalizuok tikslinį YAML naudodamas PyYAML.
2. Patikrink, kad nėra `rating: 0`, o kiekviena komandinė prizinė komanda turi netuščią `members`.
3. Kiekvienai YAML prizininkų grupei atskirai perskaičiuok pirmąsias tris vietas iš visos jai skirtos galutinės lentelės; prieš išsaugodamas palygink jas su YAML.
4. Prieš baigdamas palygink visus `winners`, `women_winners`, `ltu_winners`, `ltu_women_winners` ir `team_winners[].members` vardus su `nameMap.json`; pataisyk tik ten, kur yra tikslus žemėlapio arba ankstesnio YAML atitikmuo.
5. Paleisk `python wp-content/plugins/cempionatu-lentele/convert_yamls_to_main_json.py`.
6. Aiškiai nurodyk, kiek turnyrų pridėta ar atnaujinta, kurie šaltiniai naudoti ir kurie numatyti turnyrai sąmoningai neįtraukti.
