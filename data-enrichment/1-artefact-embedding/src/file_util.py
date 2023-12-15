from pathlib import Path

import requests


class FileUtil:
    """Util for common file operations used in this Application"""

    @staticmethod
    def exists(path_or_url: str) -> bool:
        """Check if a file given by a file path or url exists / is accessible

        @:param path_or_url : file path or url (e.g. /example/file.txt | http://example.de/file.txt
        """
        if path_or_url.startswith('http'):
            return requests.head(path_or_url).status_code == 200
        else:
            return Path(path_or_url).exists()
