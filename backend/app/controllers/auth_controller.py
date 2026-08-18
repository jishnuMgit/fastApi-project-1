from app.schemas.auth import LoginRequest
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from fastapi import HTTPException
from sqlalchemy import or_
from app.core.security import passwordhash,verifypassword,create_access_token



def login_controller(data: LoginRequest, db: Session):

    print(data)

    email = data.email
    password = data.password

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    checkpass=verifypassword(user.password,password)
    if not checkpass:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    userdetails={
        "id": user.id,
         "email": user.email,
        "full_name": user.full_name
    }
    jwttoken= create_access_token(userdetails)
    return {
        "message": "login successful",
        "user": {
            "id": user.id,
            "email": user.email,
            "full_name": user.full_name
        },
        "access_token": jwttoken,
        "token_type": "bearer"
    }

def register_controller(data: UserCreate, db: Session):

    existing_user = (
        db.query(User)
        .filter(
            or_(
                User.email == data.email,
                User.phone == data.phone
            )
        )
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Email or phone already exists"
        )

    password_hash=passwordhash(data.password)
    user = User(
        full_name=data.full_name,
        age=data.age,
        phone=data.phone,
        email=data.email,
        password=password_hash
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User registered successfully",
        "user_id": user.id,
        "email": user.email
    }