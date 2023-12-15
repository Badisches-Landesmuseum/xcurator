import json
from pathlib import Path
from typing import Any, List, Union

import httpx
import pandas
from cftime import datetime  # cftime used to support "minus years" - before christ
from pandas import DataFrame
from py_config import data_dir


class AP:
    imports = """
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX edm: <http://www.europeana.eu/schemas/edm/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd:  <http://www.w3.org/2001/XMLSchema#>
    PREFIX sem: <http://semanticweb.cs.vu.nl/2009/11/sem/>
    """

    count_select = """
            SELECT
                (count(distinct ?record) as ?totalCount)
    """

    data_select = """
         SELECT distinct
                (?record as ?identifier)
                ?creator
                ?located
                ?title
                ?iiif
                (group_concat(distinct ?description;separator=" | ") as ?descriptions)
                (group_concat(distinct ?abstract;separator=" | ") as ?abstracts)
                (group_concat(distinct ?medium;separator=" | ") as ?mediums)
                (group_concat(distinct ?type;separator=" | ") as ?types)
                ?begin
                ?end
    """

    where = """
        WHERE {
              ?record rdf:type edm:ProvidedCHO .
              ?record foaf:depiction ?iiif .
              ?record dc:title ?title .
              OPTIONAL {?record dc:description ?description. }
              OPTIONAL {?record dc:creator ?creator. }
              OPTIONAL {?record dct:spatial ?located . }
              OPTIONAL {?record dc:source ?abstract . }
              OPTIONAL {?record sem:hasBeginTimeStamp ?begin. }
              OPTIONAL {?record sem:hasEndTimeStamp ?end. }
              OPTIONAL {?record dct:medium ?medium. }
              OPTIONAL {?record dc:type ?type. }
    
              FILTER(!bound(?creator) || isLiteral(?creator))
              FILTER(!bound(?located) || isLiteral(?located))
              FILTER(!bound(?medium) || isLiteral(?medium))
              FILTER(!bound(?type) || isLiteral(?type))
            }
    """

    sources = {
        "BEELADEBANK": "https://lod.uba.uva.nl/_api/datasets/UB-UVA/Beeldbank/services/virtuoso/sparql",
    }

    def get_data(self) -> DataFrame:
        self._temp_directory().mkdir(parents=True, exist_ok=True)
        artefact_file = self._temp_directory("ap-artefacts.json")

        if not artefact_file.exists():
            raw_data = self._raw_data()
            valid_data = [record for identifier, record in raw_data.items() if
                          self._has_title(record) and self._has_image(record)]
            artefacts = [self._to_artefact(item) for item in valid_data]

            with artefact_file.open("w", encoding="utf-8") as outfile:
                json.dump(artefacts, outfile, default=self._json_serial)

        return pandas.read_json(artefact_file)

    def _temp_directory(self, file: str = None) -> Path:
        if file:
            temp_dir = data_dir(f"ap/{file}")
        else:
            temp_dir = data_dir("ap")

        return temp_dir

    def _request_sparql(self, lod_url: str, sparql_query: str) -> list[dict[str, Any]]:
        form_data = {"query": sparql_query}
        response = httpx.post(lod_url, data=form_data, timeout=20.0)
        if response.status_code != 200:
            raise Exception(f"Query failed: {response.status_code} {response.reason_phrase} {response.text}")

        body = response.content.decode("utf-8")
        json_data = json.loads(body)
        return json_data

    def _download_data(self, file: Path):
        ap_data = {}
        batch_size = 5000  # Virtuoso limit

        total_count_query = f"{self.imports} {self.count_select} {self.where}"
        for source, url in self.sources.items():
            total_count = self._request_sparql(url, total_count_query)[0]["totalCount"]
            total_count = int(total_count)

            for index in range(0, total_count, batch_size):
                data_query = f"{self.imports} {self.data_select} {self.where} OFFSET {index} LIMIT {batch_size}"
                data = self._request_sparql(url, data_query)
                ap_data.update({item["identifier"]: item for item in data})

        with file.open("w", encoding="UTF-8") as json_file:
            json.dump(ap_data, json_file)

    def _raw_data(self):
        rar_json_file = self._temp_directory("raw-data.json")
        if not rar_json_file.exists():
            self._download_data(rar_json_file)

        with rar_json_file.open("r", encoding="UTF-8") as json_file:
            return json.load(json_file)

    def _has_title(self, json_record: dict[Any, str]) -> bool:
        return 'title' in json_record and json_record['title'] is not None and len(json_record['title']) > 0

    def _get_title(self, json_record: dict[Any, str]) -> str:
        return json_record['title'].strip()

    def _has_description(self, json_record: dict[Any, str]) -> bool:
        return 'descriptions' in json_record and json_record['descriptions'] is not None and len(
            json_record['descriptions']) > 0

    def _get_description(self, json_record: dict[Any, str]) -> str:
        return json_record['descriptions'].strip().replace(" | ", "\n")

    def _has_abstract(self, json_record: dict[Any, str]) -> bool:
        return 'abstracts' in json_record and json_record['abstracts'] is not None and len(json_record['abstracts']) > 0

    def _get_abstract(self, json_record: dict[Any, str]) -> str:
        return json_record['abstracts'].strip()

    def _has_image(self, json_record: dict[Any, str]) -> bool:
        return 'iiif' in json_record and json_record['iiif'] is not None and len(json_record['iiif']) > 0

    def _get_image(self, iif_url: str, max_width: int = 360) -> str:
        rotation_index = iif_url.index('/full/')
        return f"{iif_url[:rotation_index]}/full/!{max_width},{max_width}/{iif_url[rotation_index + len('/full/full/'):]}"

    def _build_date_literal(self, json_record: dict[Any, str]) -> Union[str, None]:
        if json_record['begin'] and json_record['end']:
            return f"{json_record['begin']} - {json_record['end']}"
        elif json_record['begin']:
            return f"{json_record['begin']}"
        elif json_record['end']:
            return f"{json_record['end']}"
        else:
            return None

    def _has_person(self, json_record: dict[Any, str]) -> bool:
        return 'creator' in json_record and json_record['creator'] is not None

    def _get_person(self, json_record: dict[Any, str]) -> str:
        return json_record['creator'].strip()

    def _has_location(self, json_record: dict[Any, str]) -> bool:
        return 'located' in json_record and json_record['located'] is not None

    def _get_location(self, json_record: dict[Any, str]) -> str:
        return json_record['located'].strip()

    def _has_material(self, json_record: dict[Any, str]) -> bool:
        return 'mediums' in json_record and json_record['mediums'] is not None

    def _get_materials(self, json_record: dict[Any, str]) -> List[str]:
        return json_record['mediums'].strip().split(" | ")

    def _has_keywords(self, json_record: dict[Any, str]) -> bool:
        return 'types' in json_record and json_record['types'] is not None

    def _get_keywords(self, json_record: dict[Any, str]) -> List[str]:
        return json_record['types'].strip().split(" | ")

    def _to_artefact(self, json_data: dict):
        description = json_data["descriptions"].replace("| ", "\n\n")
        abstracts = json_data['abstracts'].replace("| ", "\n\n")
        artefact_description = f"{description}\n\n{abstracts}"

        image_urls = [self._get_image(iiif_url) for iiif_url in json_data['iiif'].split(" | ")]

        artefact = {
            "title": {
                "nl": json_data['title'],
            },
            "description": {
                "nl": artefact_description,
            },
            "images": [{"url": url,
                        "licence": {"url": "https://creativecommons.org/publicdomain/zero/1.0/deed.nl", "name": "CC-0"},
                        "photographer": None} for url in image_urls],
            "keywords": self._get_keywords(json_data) if self._has_keywords(json_data) else [],
            "materials": self._get_materials(json_data) if self._has_material(json_data) else [],
            "techniques": [],
            "locations": [{"name": self._get_location(json_data), "countryName": None}] if self._has_location(
                json_data) else [],
            "persons": [{"name": self._get_person(json_data)}] if self._has_person(json_data) else [],
            "dateRange": {
                "start": datetime(int(json_data['begin']), 1, 1) if json_data['begin'] else None,
                "end": datetime(int(json_data['end']), 12, 31) if json_data['end'] else None,
                "literal": self._build_date_literal(json_data),
            },
            "sourceInfo": {
                "id": json_data['identifier'],
                "collection": "Beeladebank",
                "owner": "Allard Pierson Museum",
                "language": "nl",
                "url": json_data['identifier']
            },
        }

        return artefact

    def _json_serial(self, obj):
        """JSON serializer for objects not serializable by default json code"""

        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d')  # e.g. -0001-12-31
        raise TypeError("Type %s not serializable" % type(obj))
