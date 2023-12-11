import json
from typing import List, Dict

import numpy as np
import pandas
from py_config import print_3pc_banner, data_dir
from tqdm import tqdm

print_3pc_banner()

print("""
###########################################################################
#           sample creation script for NEL                                #
###########################################################################

Requirement:
- `data` directory including a *artefact*.json file containing the xcurator data
""")

# Data
json_file = list(data_dir().rglob("xcurator_*11-09.json"))[0]
print(f"Found data: {json_file}")

df = pandas.read_json(json_file, orient='records')
total = len(df.index)
# print(f"total available: {total}, sample: {10000} ratio: {0.5} ")
# sample = df.iloc[np.r_[0:5000, -5000:0]]

with tqdm(total=total) as pbar:
    sample_data: Dict[str, List[Dict]] = {"de": [], "en": [], "nl": []}
    artefacts = []

    for index, item in df.iterrows():
        source_id = item['sourceInfo']['id']
        for language in item['title']:
            title = item['title'][language]
            description = item['description'][language] if language in item['description'] else ""

            date = item['dateRange']['literal'] if item['dateRange'] and item['dateRange'][
                'literal'] is not None else ""
            person_names = ", ".join([person['name'] for person in item['persons']])
            location_names = ", ".join([location['name'] for location in item['locations']])
            keywords = ", ".join([keyword for keyword in item['keywords']])

            context = ". ".join(
                [context_part for context_part in [date, person_names, location_names, keywords] if context_part])

            text = f"{context}{title}{description}"

            date = None
            if item['dateRange'] and item['dateRange']['start']:
                date = item['dateRange']['start']



            sample_data[language].append({
                "id": source_id,
                "text": text,
                "date": date
            })

            pbar.update(1)

for language in list(sample_data.keys()):
    with data_dir(f"xcurator-{language}-date-full.json").open("w", encoding="UTF-8") as json_file:
        json.dump(sample_data[language], json_file, indent=2)
