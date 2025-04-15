from fastapi import APIRouter, Depends, Request
from app.models import BookingCreate, Booking
from app.utils import get_current_user
from app.db import bookings_collection
from bson.objectid import ObjectId
from app.db import users_collection
from fastapi import HTTPException

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
    try:
        user_bookings = bookings_collection.find({"userId": user_id})
        bookings = []
        for b in user_bookings:
            user_id_value = b["userId"]["id"]
            mentor = users_collection.find_one({ "_id": ObjectId(b["mentorId"]) })
            mentor_name = mentor.get("name", "Unknown") if mentor else "Unknown"
            booking = {
                "id": str(b["_id"]),
                "userId": user_id_value,
                "mentorId": b["mentorId"],
                "mentorName": mentor_name,
                "date": b.get("date", ""),
                "time": b.get("time", ""),
                "topic": b.get("topic", ""),
                "status": b.get("status", "pending"),
            }
            bookings.append(booking)
    except Exception as e:
        print("Error in /bookings/me:", e)
        raise HTTPException(status_code=500, detail="Failed to fetch bookings.")
    
    return bookings

@router.get("/mentors")
def get_mentors():
    mentors = users_collection.find({ "role": "mentor" })
    return [
        { "id": str(m["_id"]), "name": m.get("name", "Unknown Mentor") }
        for m in mentors
    ]
