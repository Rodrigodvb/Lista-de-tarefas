from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database import engine
import backend.models as models

from backend.routers import auth, tarefas

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tarefas.router)

@app.get("/")
def root():
    return {"status": "API rodando 🚀"}