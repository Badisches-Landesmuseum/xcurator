from typing import Optional

from pydantic import BaseModel


class Image(BaseModel):
    projectId: str
    id: str
    path: str
    referenceId: Optional[str]
