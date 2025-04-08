from pymongo import MongoClient
from app.env import get_env

MONGO_URI = get_env("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.skillswap 
bookings_collection = db.bookings
users_collection = db.users
