from pydantic import BaseModel
from typing import List

class BookingCreate(BaseModel):
    mentorId: str
    date: str
    time: str
    topic: str

class Booking(BookingCreate):
    id: str
    userId: str
