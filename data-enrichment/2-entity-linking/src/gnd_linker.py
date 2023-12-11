from typing import List, Dict, Union

import requests


class GNDLinker:
    def __init__(self, wikidata_sparql_endpoint: str = 'https://query.wikidata.org/sparql') -> None:
        self.__wikidata_sparql_endpoint = wikidata_sparql_endpoint

    def to_gnd_id(self, wikidata_ids: List[str]) -> Dict[str, Union[str, None]]:
        query = self.__build_sparql_query(wikidata_ids)
        json_response = self.__request_endpoint(query, self.__wikidata_sparql_endpoint)
        return {result['id']['value'][31:]: result['gnd']['value'] if 'gnd' in result else None for result in
                json_response['results']['bindings']}

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
            SELECT ?id ?gnd WHERE {{
                VALUES ?id {{ {" ".join(q_ids)} }}
                Optional{{ ?id wdt:P227 ?gnd .}}
            }} LIMIT {len(wikidata_ids)}
        '''
