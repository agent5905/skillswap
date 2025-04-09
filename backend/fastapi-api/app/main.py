from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import bookings
from app.routers import admin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or "*" for dev
    allow_credentials=True,
    allow_methods=["*"],  # or ["GET", "POST", "OPTIONS"]
    allow_headers=["*"],  # or ["Authorization", "Content-Type"]
)

app.include_router(admin.router)
app.include_router(bookings.router)