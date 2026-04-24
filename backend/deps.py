from fastapi import Header, HTTPException
from jose import jwt
from backend.auth import SECRET_KEY, ALGORITHM

def get_current_user(authorization: str = Header()):
    if not authorization:
        raise HTTPException(401, "Token ausente")

    try:
        token = authorization.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except:
        raise HTTPException(401, "Token inválido")
print("deps carregado")