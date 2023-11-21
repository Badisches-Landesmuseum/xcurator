import json
from pathlib import Path
from typing import Any, Dict
from urllib.parse import urlparse, parse_qs

import httpx
import pandas
from bs4 import BeautifulSoup
from cftime import datetime
from pandas import DataFrame
from py_config import data_dir


class BLM:
    sources = {
        "CUE": "https://expotest.bsz-bw.de/blm/cue/selekt?len=20000&mim=json",
        "DK": "https://expotest.bsz-bw.de/blm/digitaler-katalog/selekt?len=20000&mim=json",
    }

    def get_data(self, continent_json: Path = None) -> DataFrame:
        self._temp_directory().mkdir(parents=True, exist_ok=True)
        artefact_file = self._temp_directory("blm-artefacts.json")

        if not artefact_file.exists():
            raw_data = self._raw_data()
            valid_data = [record for imdas_id, record in raw_data.items() if
                          self._has_title(record) and self._has_images(record)]
            artefacts = [self._to_artefact(item) for item in valid_data]

            with artefact_file.open("w", encoding="utf-8") as outfile:
                json.dump(artefacts, outfile, default=self._json_serial)

        df = pandas.read_json(artefact_file)
        if continent_json and continent_json.exists():
            df = self._add_country_continent(df, continent_json)
        return df

    def _temp_directory(self, file: str = None) -> Path:
        if file:
            temp_dir = data_dir(f"blm/{file}")
        else:
            temp_dir = data_dir("blm")

        return temp_dir

    def _download_data(self, file: Path):
        blm_data = {}
        for source, url in self.sources.items():
            response = httpx.get(url, timeout=60)
            if response.status_code != 200:
                raise ConnectionError(f"Unable to fetch data source {source}: {url}")
            blm_data.update({record['imdasid']: record for record in json.loads(response.content).get('records', [])})
        with file.open("w", encoding="UTF-8") as json_file:
            json.dump(blm_data, json_file)

    def _raw_data(self):
        rar_json_file = self._temp_directory("raw-data.json")
        if not rar_json_file.exists():
            self._download_data(rar_json_file)

        with rar_json_file.open("r", encoding="UTF-8") as json_file:
            return json.load(json_file)

    def _has_title(self, json_record: dict[Any, str]) -> bool:
        return 'titel' in json_record and json_record['titel'] is not None and len(json_record['titel']) > 0 and \
            json_record[
                'titel'].strip() != 'o.T.'

    def _get_title(self, json_record: dict[Any, str]) -> str:
        return json_record['titel'].strip()

    def _has_description(self, json_record: dict[Any, str]) -> bool:
        return 'textdeutsch' in json_record and json_record['textdeutsch'] is not None and len(
            json_record['textdeutsch']) > 0

    def _get_description(self, json_record: dict[Any, str]) -> str:
        html_description = json_record['textdeutsch'].strip()
        soup = BeautifulSoup(html_description)
        return soup.get_text('\n').replace('\n', '\n\n')

    def _get_images(self, json_record: dict[Any, str]) -> list[Dict[str, str]]:
        images = []
        imdas_id = json_record['imdasid']
        for medium_json in json_record['medium']:
            image = {}

            if 'link' in medium_json.keys() and medium_json['typ'] == 'Bild':
                url_string = medium_json['link']
                url = urlparse(url_string)
                url_dict = parse_qs(url.query)
                pos = int(url_dict['pos'][0])
                iiif_url_base = f"https://data.landesmuseum.de/iiif/3/{imdas_id}_{format(pos, '03d')}/"

                max_width = 360
                iiif_end = f"full/!{max_width},{max_width}/0/default.jpg"
                image['url'] = f"{iiif_url_base}{iiif_end}"

            if 'fotograf' in medium_json.keys() and medium_json['typ'] == 'Bild':
                image['photographer'] = medium_json['fotograf']

            if 'rechtestatus' in medium_json.keys() and medium_json['typ'] == 'Bild':
                image['licence'] = medium_json['rechtestatus'][0]['urls'][0]['term']

            if 'licence' not in image:
                image['licence'] = 'https://creativecommons.org/publicdomain/zero/1.0/deed.de'
            if image.keys():
                images.append(image)
        return images

    def _has_persons(self, json_record: dict[Any, str]) -> bool:
        return 'person' in json_record and json_record['person'] is not None and len(json_record['person']) > 0

    def _get_persons(self, json_record: dict[Any, str]) -> list[Dict[str, str]]:
        persons = []
        if self._has_persons(json_record):
            for person_json in json_record['person']:
                person = {
                    'name': f"{person_json['nachname']} ({person_json['typ']})"
                }

                if 'gndnummer' in person_json:
                    person['linkedData'] = [{
                        "gnd": {
                            "url": f"https://d-nb.info/gnd/{person_json['gndnummer']}",
                            "id": person_json['gndnummer']
                        }
                    }]
                persons.append(person)
        return persons

    def _has_locations(self, json_record: dict[Any, str]) -> bool:
        return 'ort' in json_record and json_record['ort'] is not None and len(json_record['ort']) > 0

    def _get_locations(self, json_record: dict[Any, str]) -> list[Dict[str, str]]:
        locations = []
        if self._has_locations(json_record):
            for location_json in json_record['ort']:
                if "Ort fraglich" != location_json['term']:
                    location = {
                        'name': f"{location_json['term']} ({location_json['typ']})"
                    }
                    locations.append(location)
        return locations

    def _has_media(self, json_record: dict[Any, str]) -> bool:
        return 'medium' in json_record and json_record['medium'] is not None and len(json_record['medium']) > 0

    def _has_images(self, json_record: dict[Any, str]) -> bool:
        if self._has_media(json_record):
            for media_json in json_record['medium']:
                return 'link' in media_json.keys()
        return False

    def _licence_url_to_name(self, licence_url: str):
        if not licence_url.startswith("http"):
            raise ValueError("Only urls are mapped to names")

        return {
            'https://creativecommons.org/publicdomain/zero/1.0/deed.de': 'CC-0',
            'https://creativecommons.org/licenses/by-nc/4.0/deed.de': 'CC BY-NC 4.0',
            'https://creativecommons.org/publicdomain/mark/1.0/deed.de': 'Public Domain Mark 1.0',
            'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de': 'CC BY-NC-SA 4.0',
            'https://creativecommons.org/licenses/by-sa/4.0/deed.de': 'CC BY-SA 4.0',
            'https://creativecommons.org/licenses/by/4.0/deed.de': 'CC BY 4.0',
            'https://creativecommons.org/licenses/by-nc-nd/4.0/deed.de': 'CC BY-NC-ND 4.0',
            'https://creativecommons.org/licenses/by-nd/4.0/deed.de': 'CC BY-ND 4.0',
            'https://rightsstatements.org/page/InC/1.0/?language=de': 'In Copyright',
            'https://www.deutsche-digitale-bibliothek.de/content/lizenzen/rv-fz/': 'Rechte vorbehalten – Freier Zugang',
        }[licence_url]

    def _to_artefact(self, json_data: dict):
        datierung = [{"literal": date['term'], "start": datetime(int(float(date['beginn'])), 1, 1),
                      "end": datetime(int(float(date["ende"])), 12, 31) if "ende" in date else None} for date in
                     json_data["datierung"] if "beginn" in date or "begin" in date] if "datierung" in json_data else []

        artefact = {
            "title": {
                "de": json_data['titel'],
            },
            "description": {"de": self._get_description(json_data)} if self._has_description(json_data) else {},
            "images": [{"url": image['url'], "licence": {"url": image['licence'] if image[
                                                                                        'licence'] != 'https://www.deutsche-digitale-bibliothek.de/content/lizenzen/rv-fz/' else 'https://www.deutsche-digitale-bibliothek.de/content/lizenzen/rv-fz/?lang=de',
                                                         "name": self._licence_url_to_name(image['licence'])},
                        "photographer": image['photographer'] if 'photographer' in image else None} for image in
                       self._get_images(json_data)],
            "keywords": [keyword_data['term'] for keyword_data in
                         json_data['schlagworte']] if "schlagworte" in json_data else [],
            "materials": [material_data['term'] for material_data in
                          json_data['material']] if "material" in json_data else [],
            "techniques": [technique_data['term'] for technique_data in
                           json_data['technik']] if "technik" in json_data else [],
            "locations": self._get_locations(json_data),
            "persons": self._get_persons(json_data) if self._has_persons(json_data) else [],
            "dateRange": None,
            "sourceInfo": {
                "id": json_data['imdasid'],
                "collection": "Expo DB",
                "owner": "Badisches Landesmuseum",
                "language": "de",
                "url": f"https://data.landesmuseum.de/id/{json_data['imdasid']}"
            },
        }

        if len(datierung) > 0:
            artefact['dateRange'] = datierung[0]

        if "sammlungsgliederung" in json_data and len(json_data['sammlungsgliederung']) > 0:
            artefact['sourceInfo']['collection'] = json_data['sammlungsgliederung'][0]['term']

        return artefact

    def _json_serial(self, obj):
        """JSON serializer for objects not serializable by default json code"""

        if isinstance(obj, (datetime)):
            return obj.strftime('%Y-%m-%d')  # e.g. -0001-12-31
        raise TypeError("Type %s not serializable" % type(obj))

    def _map_continent(self, geopy_continent: str) -> str:
        match geopy_continent:
            case 'AF':
                return 'AFRICA'
            case 'AS':
                return 'ASIA'
            case 'EU':
                return 'EUROPA'
            case 'NA':
                return 'AMERICA'
            case 'SA':
                return 'AMERICA'
            case 'OC':
                return 'ASIA'

    def _add_country_continent(self, artefact_corpus: DataFrame, county_json: Path) -> DataFrame:
        with county_json.open(encoding="UTF-8") as source:
            continent_country: Dict = json.load(source)

        for idx, row in artefact_corpus.iterrows():
            source_id = row["sourceInfo"]['id']
            if source_id in continent_country:
                country_continent = continent_country[source_id]
                locations = row["locations"]
                for location in locations:
                    continent = self._map_continent(country_continent["continent"])
                    location["continent"] = continent
                    location["country"] = country_continent["country"]
                row["locations"] = locations

        return artefact_corpus
