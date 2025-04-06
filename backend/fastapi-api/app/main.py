from fastapi import FastAPI
from app.routers import bookings
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
app.include_router(bookings.router)