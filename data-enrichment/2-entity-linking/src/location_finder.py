import time
from typing import List, Dict, Union

import requests

@staticmethod
def batch(iterable, n=1):
    l = len(iterable)
    for ndx in range(0, l, n):
        yield iterable[ndx:min(ndx + n, l)]

class LocationFinder:
    def __init__(self, wikidata_sparql_endpoint: str = 'https://query.wikidata.org/sparql') -> None:
        self.__wikidata_sparql_endpoint = wikidata_sparql_endpoint

    def get_location_info(self, wikidata_ids: List[str]) -> Dict[str, Union[Dict[str, str], None]]:
        results = {}
        for wiki_id_batch in batch(wikidata_ids, 1000):
            query = self.__build_sparql_query(wiki_id_batch)
            json_response = self.__request_endpoint(query, self.__wikidata_sparql_endpoint)
            time.sleep(0.3)
            results.update({result['id']['value'][31:]: {"iso": result['iso']['value'],
                                                 'continent': result['continentName']['value']} if all(
                item in result for item in ['iso', 'continentName']) else None for result in
                    json_response['results']['bindings']})
        return results


    @staticmethod
    def __request_endpoint(query: str, endpoint_url: str) -> dict:
        form_data = {'query': query}
        headers = {'Accept': 'application/json'}
        response = requests.post(url=endpoint_url, data=form_data, headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            raise ConnectionError(f"Unable to request Wikidata ({response.status_code}): {response.reason} ")

    @staticmethod
    def __build_sparql_query(wikidata_ids: List[str]) -> str:
        q_ids = [f"wd:{q_id}" for q_id in wikidata_ids]
        return f'''
            SELECT ?id ?iso ?continentName WHERE {{
                VALUES ?id {{ {" ".join(q_ids)} }}
                Optional{{ ?id wdt:P17 ?country. ?country wdt:P297 ?iso . ?country wdt:P30 ?continent. ?continent rdfs:label ?continentName }}
                filter (lang(?continentName) = "en").
            }} LIMIT {len(wikidata_ids)}
        '''


