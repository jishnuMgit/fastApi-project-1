from fastapi import APIRouter
from app.controllers.auth_controller import login_controller
from app.schemas.auth import LoginRequest
from app.schemas.user import UserCreate
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.auth_controller import register_controller
from app.database.database import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login")
def login(data: LoginRequest,db:Session=Depends(get_db)):
    return login_controller(data,db)

@router.post("/register")
def register(
    data: UserCreate,
    db: Session = Depends(get_db)
):
    return register_controller(data, db)