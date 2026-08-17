from app.schemas.auth import LoginRequest
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

def login_controller(data: LoginRequest):
    print(data)
    return {
        "message": "login successful",
        "email": data.email
    }

def register_controller(data: UserCreate, db: Session):

    user = User(
        full_name=data.full_name,
        age=data.age,
        phone=data.phone,
        email=data.email,
        password=data.password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User registered successfully",
        "user_id": user.id,
        "email": user.email
    }