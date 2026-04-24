from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from backend.database import Base

class Tarefa(Base):
    __tablename__ = "tarefas"

    id = Column(String, primary_key=True, index=True)
    texto = Column(String)
    concluida = Column(Boolean, default=False)

    usuario_id = Column(String, ForeignKey("usuarios.id"))
    
class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(String, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
