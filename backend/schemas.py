from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str

class TarefaCreate(BaseModel):
    texto: str

class TarefaResponse(BaseModel):
    id: str
    texto: str
    concluida: bool
    usuario_id: str

    class Config:
        from_attributes = True