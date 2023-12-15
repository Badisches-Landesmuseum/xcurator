from typing import List

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel

from src.OpenCLIPText import OpenCLIPText
from py_config import print_3pc_banner
app = FastAPI()
textual_encoder = OpenCLIPText()


class TextInput(BaseModel):
    text: str


@app.post("/text/embedding")
async def read_root(data: TextInput) -> List[float]:
    return list(textual_encoder.predict(data.text))


if __name__ == "__main__":
    print_3pc_banner()
    print("""
    Clip Http Service
    """)
    uvicorn.run("main:app", host='0.0.0.0', port=8080)
