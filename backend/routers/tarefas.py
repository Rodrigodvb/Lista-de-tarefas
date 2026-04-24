from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from backend.database import SessionLocal
from backend.models import Tarefa
from backend.schemas import TarefaCreate
from backend.deps import get_current_user

router = APIRouter(prefix="/tarefas")

# DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# LISTAR
@router.get("")
def listar(
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Tarefa).filter(Tarefa.usuario_id == user_id).all()

# CRIAR
@router.post("")
def criar(
    tarefa: TarefaCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    nova = Tarefa(
        id=str(uuid.uuid4()),
        texto=tarefa.texto,
        concluida=False,
        usuario_id=user_id
    )

    db.add(nova)
    db.commit()
    db.refresh(nova)
    return nova

# TOGGLE
@router.put("/{id}")
def toggle(
    id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    tarefa = db.query(Tarefa).filter(
        Tarefa.id == id,
        Tarefa.usuario_id == user_id
    ).first()

    if not tarefa:
        raise HTTPException(404, "Tarefa não encontrada")

    tarefa.concluida = not tarefa.concluida
    db.commit()
    return tarefa

# DELETE
@router.delete("/{id}")
def deletar(
    id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    tarefa = db.query(Tarefa).filter(
        Tarefa.id == id,
        Tarefa.usuario_id == user_id
    ).first()

    if not tarefa:
        raise HTTPException(404, "Tarefa não encontrada")

    db.delete(tarefa)
    db.commit()
    return {"ok": True}