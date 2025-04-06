from fastapi import APIRouter, Depends, Request
from app.models import BookingCreate, Booking
from app.utils import get_current_user
import uuid

router = APIRouter()
bookings = []  #In-memory for now

@router.post("/bookings")
def create_booking(booking: BookingCreate, request: Request, user_id: str = Depends(get_current_user)):
    new_booking = booking.dict()
    new_booking["id"] = str(uuid.uuid4())
    new_booking["userId"] = user_id
    bookings.append(new_booking)
    return new_booking

@router.get("/bookings/me", response_model=list[Booking])
def get_my_bookings(user_id: str = Depends(get_current_user)):
    return [b for b in bookings if b["userId"] == user_id]
