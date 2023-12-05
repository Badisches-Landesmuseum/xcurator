import json
import logging
from typing import List, Dict, Union

import requests
from py_config import resources_dir


class DeeplTranslator:
    __cost_by_char = 0.00002

    def __init__(self, api_key: str, languages: List[str], cache_only=True, cache_update=100) -> None:
        if not languages:
            raise ValueError("no languages given")

        print("Initiating language caches:")
        self.__cache = {lang: self.__load_language_dict(lang) for lang in languages}
        self.__cache_update = cache_update
        self.__api_key = api_key
        self.__languages = languages

        print(f"Deepl API status: {self.available_chars()} chars available for translation.")
        self.__cache_only = cache_only
        self.__counter = 0
        self.__char = 0
        assert self.__cache

    def translate(self, source_lang: str, target_lang: str, text: str) -> Union[str, None]:
        text = text.strip()  # every char counts at deepl
        lang_dict = self.__cache.get(source_lang)

        if not text:
            return text

        if text in lang_dict and target_lang in lang_dict[text]:
            translation = lang_dict[text][target_lang]
            if not translation:
                raise ValueError("Cache contains None values!")
            return translation
        else:
            self.__char = self.__char + len(text)
            if self.__cache_only:
                logging.info("Cache only: skip translation")
                return None
            else:
                translation = self.__deepl_translate(source_lang, target_lang, text)
                self.__counter = self.__counter + 1
                if text in lang_dict:
                    lang_dict[text][target_lang] = translation
                else:
                    lang_dict[text] = {target_lang: translation}

                if self.__counter % self.__cache_update == 0:
                    self.__store__cache()

                return translation

    def languages(self) -> List[str]:
        return self.__languages

    def safe(self) -> None:
        self.__store__cache()

    def __load_language_dict(self, language: str) -> Dict[str, Dict[str, str]]:
        cache = {}

        new_cache = resources_dir(f"{language}_translations-new.json")
        if new_cache.exists():
            with new_cache.open(encoding="UTF-8") as source:
                language_cache = json.load(source)
                cache.update(language_cache)

        default_cache = resources_dir(f"{language}_translations.json")
        if default_cache.exists():
            with default_cache.open(encoding="UTF-8") as source:
                language_cache = json.load(source)
                cache.update(language_cache)

        print(f"\t - {language} cache contains {len(cache)} entries.")
        return cache

    def __store__cache(self):
        for language, cache in self.__cache.items():
            cache_json = resources_dir(f"{language}_translations.json")
            with cache_json.open('w', encoding='UTF-8') as json_file:
                json.dump(cache, json_file)

    def __deepl_translate(self, source_lang: str, target_lang: str, text: str) -> str:
        response = requests.post("https://api.deepl.com/v2/translate",
                                 headers={
                                     "Authorization": f"DeepL-Auth-Key {self.__api_key}"},
                                 data={"target_lang": target_lang.upper(),
                                       "source_lang": source_lang.upper(),
                                       "text": [text]})

        if response.status_code == 200:
            body = json.loads(response.content)
            return body['translations'][0]["text"]
        else:
            self.safe()
            logging.warning(f"Error during translation. {response.status_code}: {response.content}")

    def calc_cost(self, count: int = None) -> float:
        char_count = count if count else self.__char

        return float(char_count) * self.__cost_by_char

    def available_chars(self) -> int:
        response = requests.get("https://api.deepl.com/v2/usage",
                                headers={"Authorization": f"DeepL-Auth-Key {self.__api_key}"})
        if response.status_code == 200:
            body = json.loads(response.content)
            return body['character_limit'] - body['character_count']
        else:
            raise IOError("Unable to request deepl usage api.")

    def missing_chars(self) -> int:
        return self.__char

    def missing_texts(self) -> int:
        return self.__counter
