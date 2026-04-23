from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from backend.database import SessionLocal, engine
from backend.models import Tarefa
from backend.schemas import TarefaCreate, TarefaResponse
import backend.models as models
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# dependência de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ======================
# ROTAS
# ======================

@app.get("/tarefas", response_model=list[TarefaResponse])
def listar(db: Session = Depends(get_db)):
    return db.query(Tarefa).all()

@app.post("/tarefas", response_model=TarefaResponse)
def criar(tarefa: TarefaCreate, db: Session = Depends(get_db)):
    nova = Tarefa(
        id=str(uuid.uuid4()),
        texto=tarefa.texto,
        concluida=False
    )
    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova

@app.put("/tarefas/{id}")
def toggle(id: str, db: Session = Depends(get_db)):
    tarefa = db.get(Tarefa, id)

    if not tarefa:
        return {"erro": "Tarefa não encontrada"}

    tarefa.concluida = not tarefa.concluida
    db.commit()
    return tarefa

@app.delete("/tarefas/{id}")
def deletar(id: str, db: Session = Depends(get_db)):
    tarefa = db.get(Tarefa, id)

    if not tarefa:
        return {"erro": "Tarefa não encontrada"}

    db.delete(tarefa)
    db.commit()
    return {"ok": True}