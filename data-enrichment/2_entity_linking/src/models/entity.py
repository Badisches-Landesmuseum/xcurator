from typing import Optional, Tuple

from pydantic import BaseModel, Field, PositiveInt, PositiveFloat


class Entity(BaseModel):
    literal: str = Field(..., example="3pc GmbH", description="Literal of an Entity inside a given text.")
    property: Optional[str] = None
    start_position: int = Field(..., example="4",
                                description="Start position of the literal inside a given text", ge=0)
    sentence: Tuple[int, int] = Field(..., example=(1, 23),
                                      description="Start and End position of the surrounding sentence")
    end_position: PositiveInt = Field(..., example="6", description="Start position of the literal inside a given text")
    category: str = Field(..., example="ORG", description="Entity Category e.g. ORG, PER, LOC, MISC")
    category_score: float = Field(..., example="93.45", description="confidence score of the category", ge=0.0,
                                  le=100.00)
    link_id: Optional[str] = Field(None, example="Berlin", description="Identifier of the linked knowledgebase")
    link_source_name: str = Field(..., example="wikipedia_en", description="Name of the linked source")
    link_score: float = Field(..., example="93.45", description="confidence score of the link",
                                      ge=0.0, le=100.00)
