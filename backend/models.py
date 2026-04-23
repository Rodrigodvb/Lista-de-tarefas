from sqlalchemy import Column, String, Boolean
from backend.database import Base

class Tarefa(Base):
    __tablename__ = "tarefas"

    id = Column(String, primary_key=True, index=True)
    texto = Column(String)
    concluida = Column(Boolean, default=False)