from jose import jwt
from fastapi import HTTPException, Depends, Request
from app.env import get_env

JWT_SECRET = get_env("JWT_SECRET")

def get_current_user(request: Request):
    auth = request.headers.get('Authorization')
    if not auth:
        raise HTTPException(status_code=401, detail="Missing token")
    token = auth.split(" ")[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload["id"]
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
