from pydantic import BaseModel, Field


class ImageInput(BaseModel):
    data: str = Field(
        ...,
        example='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAZABkAA',
        description='Base64 encoded image data'
    )