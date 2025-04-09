from jose import jwt
from fastapi import HTTPException, Depends, Request
from app.env import get_env
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.json_util import dumps
from pprint import pprint   
import traceback

MONGO_URI = get_env("MONGO_URI")
JWT_SECRET = get_env("JWT_SECRET")

client = MongoClient(MONGO_URI)
users = client.skillswap.users

def get_current_user(request: Request):
    auth = request.headers.get('Authorization')
    if not auth:
        raise HTTPException(status_code=401, detail="Missing token")
    token = auth.split(" ")[1]

    print("Hey")
    users_ = users.find().limit(20)
    for user in users_:
            print("ID:", str(user["_id"]))
            print("Name:", user.get("name"))
            print("Email:", user.get("email"))
            print("Role:", user.get("role", "mentee"))
            print("-" * 30)
    try:
        
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user_id = payload["id"]
        print(user_id)
        

        
        try:
            user = users.find_one({"_id": ObjectId(user_id)})
        except Exception as db_err:
            print("MongoDB error while fetching user:", db_err)
            raise HTTPException(status_code=500, detail="Database error")
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return { "id": user_id, "role": user.get("role", "mentee") }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError as e:
        print("JWT error:", e)
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print("UNEXPECTED ERROR")
        traceback.print_exc()
        raise HTTPException(status_code=401, detail="Unexpected auth error")
