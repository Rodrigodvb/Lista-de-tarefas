from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import uuid

from backend.database import SessionLocal
from backend.models import Usuario
from backend.schemas import UserCreate, Token
from backend.auth import hash_password, verify_password, create_token

router = APIRouter(prefix="/auth")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existente = db.query(Usuario).filter(Usuario.username == user.username).first()

    if existente:
        raise HTTPException(400, "Usuário já existe")

    novo = Usuario(
        id=str(uuid.uuid4()),
        username=user.username,
        password=hash_password(user.password)
    )

    db.add(novo)
    db.commit()
    return {"msg": "Usuário criado"}

@router.post("/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(Usuario).filter(Usuario.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(401, "Credenciais inválidas")

    token = create_token({"sub": db_user.id})
    return {"access_token": token}