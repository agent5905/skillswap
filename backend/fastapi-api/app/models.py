from pydantic import BaseModel
from typing import List

class BookingCreate(BaseModel):
    date: str
    time: str
    topic: str
    mentorId: str

class Booking(BookingCreate):
    id: str
    userId: str
    mentorName: str
    status: str = "pending"  # default
