from fastapi import APIRouter, Depends, Request
from app.models import BookingCreate, Booking
from app.utils import get_current_user
from app.db import bookings_collection
from bson.objectid import ObjectId
from app.db import users_collection

router = APIRouter()

@router.post("/bookings")
def create_booking(booking: BookingCreate, request: Request, user_id: str = Depends(get_current_user)):
    new_booking = booking.dict()
    new_booking["userId"] = user_id
    new_booking["status"] = "pending"
    result = bookings_collection.insert_one(new_booking)
    new_booking["_id"] = str(result.inserted_id)
    return new_booking

@router.get("/bookings/me", response_model=list[Booking])
def get_my_bookings(user_id: str = Depends(get_current_user)):
    user_bookings = bookings_collection.find({"userId": user_id})
    bookings = []
    for b in user_bookings:
        mentor = users_collection.find_one({"_id": ObjectId(b["mentorId"])})
        if mentor:
            b["mentorName"] = mentor.get("name")
            b["id"] = str(b["_id"])
        b.pop("_id")
        bookings.append(b)

    return bookings
