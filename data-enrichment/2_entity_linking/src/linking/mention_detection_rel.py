import logging
import os
import subprocess
import sys
from pathlib import Path
from typing import Dict, List, Tuple, Union, Any

import spacy
from REL.mention_detection import MentionDetectionBase
from REL.ner import Span
from REL.utils import split_in_words


# @see: https://github.com/castorini/pyserini/blob/master/scripts/entity_linking.py

# Spacy Mention Detection class which overrides the NERBase class in the REL entity linking process
class NERSpacyMD(MentionDetectionBase):
    def __init__(self, base_url: str, wiki_version: str, spacy_model: Union[str, Path], ner_labels: List[str] = None):
        super().__init__(base_url, wiki_version)
        # we only want to link entities of specific types
        if ner_labels:
            self.ner_labels = ner_labels
        else:
            self.ner_labels = ['PERSON', 'PER', 'NORP', 'FAC', 'ORG', 'GPE', 'LOC', 'PRODUCT', 'EVENT', 'WORK_OF_ART',
                               'LAW', 'LANGUAGE', 'DATE', 'TIME', 'MONEY', 'QUANTITY', 'MISC']
        self.spacy_model = spacy_model
        spacy.prefer_gpu()
        self.tagger = self.__load_tagger(spacy_model)

    def __load_tagger(self, model_name):
        logging.info("Loading `nlp` model: {} from spacy ".format(model_name))
        try:
            nlp = spacy.load(model_name)
            nlp.vocab.vectors.name = 'spacy_pretrained_vectors'
            return nlp
        except OSError:
            cmd_download = [sys.executable, "-m", "spacy", "download", model_name]
            subprocess.call(cmd_download, env=os.environ.copy())
            nlp = spacy.load(model_name)
            nlp.vocab.vectors.name = 'spacy_pretrained_vectors'
            return nlp

    # mandatory function which overrides NERBase.predict()
    def predict(self, doc: spacy.tokens.Doc) -> List[Span]:
        spans = []
        for ent in doc.ents:
            if ent.label_ in self.ner_labels:
                spans.append(Span(ent.text, ent.start_char, ent.end_char, 0, ent.label_))
            # else:
            # logging.warning("Ignored ner label: " + ent.label_ )
        return spans

    """
    Responsible for finding mentions given a set of documents in a batch-wise manner. More specifically,
    it returns the mention, its left/right context and a set of candidates.
    :return: Dictionary with mentions per document.
    """

    def find_mentions(self, dataset: Dict[Any, str]) -> Tuple[Dict[str, List[Dict]], int]:
        results = {}
        total_ment = 0
        for i, doc in enumerate(dataset):
            result_doc = []
            doc_text = dataset[doc]
            spacy_doc = self.tagger(doc_text)
            spans = self.predict(spacy_doc)
            for entity in spans:
                text, start_pos, end_pos, conf, tag = (
                    entity.text,
                    entity.start_position,
                    entity.end_position,
                    entity.score,
                    entity.tag,
                )
                m = self.preprocess_mention(text)
                cands = self.get_candidates(m)
                if len(cands) == 0:
                    continue
                total_ment += 1
                # Re-create ngram as 'text' is at times changed by Flair (e.g. double spaces are removed).
                ngram = doc_text[start_pos:end_pos]
                left_ctxt = " ".join(split_in_words(doc_text[:start_pos])[-100:])
                right_ctxt = " ".join(split_in_words(doc_text[end_pos:])[:100])
                res = {
                    "mention": m,
                    "context": (left_ctxt, right_ctxt),
                    "candidates": cands,
                    "gold": ["NONE"],
                    "pos": start_pos,
                    "sent_idx": 0,
                    "ngram": ngram,
                    "end_pos": end_pos,
                    "sentence": doc_text,
                    "conf_md": conf,
                    "tag": tag,
                }
                result_doc.append(res)
            results[doc] = result_doc
        return results, total_ment
