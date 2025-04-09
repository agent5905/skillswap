from pymongo import MongoClient
from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).resolve().parents[0] / ".env")

client = MongoClient(os.getenv("MONGO_URI"))
users = client.skillswap.users
print("Databases:", client.list_database_names())

print("Fetching users...")
for user in users.find().limit(10):
    print({
        "id": str(user["_id"]),
        "email": user.get("email"),
        "role": user.get("role"),
    })
