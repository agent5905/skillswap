from fastapi import APIRouter, Depends, Request, HTTPException
from app.db import users_collection, bookings_collection
from app.utils import get_current_user
from bson.objectid import ObjectId

VALID_ROLES = ["mentee", "mentor", "admin"]

router = APIRouter()

def require_admin(user = Depends(get_current_user)):
    if user["role"]  != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return user["id"]

@router.put("/admin/users/{user_id}/role")
def update_user_role(user_id: str, new_role: str, admin_id: str = Depends(require_admin)):
    if new_role not in VALID_ROLES:
        raise HTTPException(status_code=400, detail="Invalid role")
    result = users_collection.update_one({"_id": ObjectId(user_id)}, { "$set": { "role": new_role } })
    return { "updated": result.modified_count == 1 }

@router.get("/admin/users")
def get_all_users(admin_id: str = Depends(require_admin)):
    users = users_collection.find()
    return [
        { "id": str(u["_id"]), "email": u.get("email"), "role": u.get("role", "mentee"), "name": u.get("name") }
        for u in users
    ]

@router.get("/admin/bookings")
def get_all_bookings(admin_id: str = Depends(require_admin)):
    bookings = bookings_collection.find()
    return [
        { "id": str(b["_id"]), "userId": b["userId"], "mentorId": b["mentorId"], "topic": b.get("topic"), "date": b["date"], "time": b["time"], "status": b.get("status", "pending") }
        for b in bookings
    ]

@router.delete("/admin/bookings/{booking_id}")
def delete_booking(booking_id: str, admin_id: str = Depends(require_admin)):
    result = bookings_collection.delete_one({ "_id": ObjectId(booking_id) })
    return { "deleted": result.deleted_count == 1 }



