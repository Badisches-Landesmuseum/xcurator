from typing import List

from flair.nn import Classifier
from flair.splitter import SegtokSentenceSplitter

from src.models.entity import Entity


class FlairEntityLinker:

    def __init__(self) -> None:
        self.__tagger = Classifier.load('linker')
        self.__ner_tagger = Classifier.load('ner')
        self.__splitter = SegtokSentenceSplitter()

    def extract_entity(self, text: str) -> List[Entity]:
        sentences = self.__splitter.split(text)
        self.__tagger.predict(sentences)

        entities = []
        for sentence in sentences:
            for label in sentence.get_labels():
                entity = Entity(
                    literal=sentence.text[label.data_point.start_position:label.data_point.end_position],
                    start_position=label.data_point.start_position,
                    end_position=label.data_point.end_position,
                    sentence=(0, 0),
                    category="NULL",
                    category_score=0.0,
                    link_source_name="wikipedia_en",
                    link_score=round(label.data_point.score * 100.00, 2),
                    link_id=label.data_point.tag
                )
                entities.append(entity)
        self.__ner_tagger.predict(sentences, label_name='ner')
        for sentence in sentences:
            for entity, label in zip(entities, sentence.get_labels()):
                ner_text = sentence.text[label.data_point.start_position:label.data_point.end_position]
                if entity.literal != ner_text:
                    continue
                entity.category = label.data_point.tag
                entity.category_score = round(label.data_point.score * 100.00, 2)

        return [entity for entity in entities if entity.link_id != '<unk>']
