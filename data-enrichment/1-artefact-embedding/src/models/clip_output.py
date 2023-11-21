from typing import List

from pydantic import BaseModel, Field


class ClipImageOutput(BaseModel):
    embedding: List[float] = Field(
        ...,
        example=[0.234234, 0.43497, ...],
        description='embedding representation of a text or image produced by the (open-) clip model.'
    )
    description: str = Field(
        ...,
        example="a brown dog sitting in front of a bench",
        description="generated text based on the visual image input"
    )