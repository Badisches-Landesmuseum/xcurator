import itertools
import json
from typing import List

import pytest
from py_config import resources_dir

from src.linking.entity_linker_flair import FlairEntityLinker
from src.linking.entity_linker_rel import RELEntityLinker
from src.models.entity import Entity


@pytest.fixture
def texts() -> List[str]:
    return [
        "Bayern played against Barcelona. The match took place in Barcelona.",
        "Sören arbeitet bei 3pc in Berlin. Er mag die Wikidata GmbH und das Brandenburger Tor.",
        "Konrad Adenauer und Angela Merkel waren Bundeskanzler von Deutschland."
    ]


@pytest.fixture
def xcurator_texts() -> List[str]:
    xcurator_texts = resources_dir("xcurator-text.json", in_test_dir=True).read_text()
    text_json = json.loads(xcurator_texts)
    texts = [[text['title'], text['description']] for text in text_json]
    return itertools.chain.from_iterable(texts)

@pytest.fixture(scope='session')
def linker() -> FlairEntityLinker:
    return FlairEntityLinker()


def test_init(mention_detector, linker):
    assert linker
    assert mention_detector


def test_nel(texts: List[str], linker: RELEntityLinker):
    for text in texts:
        entities = linker.extract_entities(text)
        print_entities(text, entities)


def test_nel_xcurator_ger(xcurator_texts: List[str], linker: RELEntityLinker):
    for text in xcurator_texts:
        entities = linker.extract_entity(text)
        print_entities(text, entities)


def print_entities(text: str, entities: List[Entity]):
    print(text)
    print("\n")
    for entity in entities:
        print(
            f"{entity.literal}({entity.category}): https://en.wikipedia.org/wiki/{entity.link_id} | {entity.link_score}")
    print("---------------------------------------------\n")
