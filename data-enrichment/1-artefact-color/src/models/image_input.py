from typing import Optional

from pydantic import BaseModel, Field


class ImageInput(BaseModel):
    source_id: str = Field(
        ...,
        example='saklddsruws3',
        description='String based id e.g. uuid'
    )
    url: str = Field(
        ...,
        example='https://example.com/image.jpgf',
        description='URL of a image resource',
        alias='image'
    )
    data: Optional[str] = Field(
        default=None,
        example='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAZABkAA',
        description='Base64 encoded image data',
        alias='base64',
    )