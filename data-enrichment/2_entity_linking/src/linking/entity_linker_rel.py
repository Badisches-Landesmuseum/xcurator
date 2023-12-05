from typing import List, Any, Dict

from REL.entity_disambiguation import EntityDisambiguation

from src.linking.mention_detection_rel import NERSpacyMD
from src.models.entity import Entity


# REL GitHub:
# Rel Docs:    https://rel.readthedocs.io/en/latest/api/wikipedia/
# Example Implementation:
class RELEntityLinker:

    def __init__(self, mention_detector: NERSpacyMD, linker: EntityDisambiguation) -> None:
        self.__mention_detector: NERSpacyMD = mention_detector
        self.__entity_linker = linker

    def extract_entity(self, text: str) -> List[Entity]:
        texts = {"test_id": text}
        return self.extract_entities(texts)["test_id"]

    def extract_entities(self, texts:Dict[Any, str]) -> Dict[Any, List[Entity]]:
        mentions, _ = self.__mention_detector.find_mentions(texts)
        predictions, _ = self.__entity_linker.predict(mentions)

        return self.__to_entities(mentions, predictions)

    @staticmethod
    def __to_entities(mentions_dataset, predictions):
        """
        Function that can be used to process the End-to-End results.
        :return: dictionary with results and document as key.
        """
        res = {}
        for doc in mentions_dataset:
            res[doc] = []
            if doc not in predictions:
                # No mentions found, we return empty list.
                continue
            pred_doc = predictions[doc]
            ment_doc = mentions_dataset[doc]
            # text = processed[doc][0]
            res_doc = []

            for prediction, mention in zip(pred_doc, ment_doc):
                sentence = mention["sentence"]

                if prediction["prediction"] != "NIL":
                    category_score = mention["conf_md"] if "conf_md" in mention else 0.0
                    category_score = round(category_score * 100.00)

                    link_score = prediction["conf_ed"] if prediction["conf_ed"] > 0.0 else float(prediction["scores"][0])

                    entity = Entity(
                        literal=sentence[mention["pos"]:mention["end_pos"]],
                        start_position=mention["pos"],
                        end_position=mention["end_pos"],
                        sentence=(0, 0),
                        category=mention["tag"] if "tag" in mention else "NULL",
                        category_score=category_score,
                        link_source_name="wikipedia_en",
                        link_score=round(link_score * 100.00, 2),
                        link_id=prediction["prediction"]
                    )
                    res_doc.append(entity)
            res[doc] = res_doc
        return res
