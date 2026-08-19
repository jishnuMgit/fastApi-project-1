from fastapi import APIRouter,Request
from app.controllers.auth_controller import login_controller
from app.schemas.auth import LoginRequest,SetupRequest
from app.schemas.user import UserCreate
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.auth_controller import register_controller,setup_user,get_current_user
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


@router.put("/setup")
def setup(
    data: SetupRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    return setup_user(data, request, db)

@router.get("/me")
def me(
    request: Request,
    db: Session = Depends(get_db)
):
    return get_current_user(request, db)