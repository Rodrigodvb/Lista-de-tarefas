from pydantic import BaseModel

class TarefaCreate(BaseModel):
    texto: str

class TarefaResponse(BaseModel):
    id: str
    texto: str
    concluida: bool

    class Config:
        from_attributes = True