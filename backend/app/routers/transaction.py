from app.controllers.auth_controller import login_controller
from app.schemas.transactions import Transaction
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.transaction_controller import Create_transaction
from app.database.database import get_db
from app.core.security import get_current_user
from fastapi import Request

router = APIRouter(
    prefix="/transactions",
    tags=["Authentication"]
)

@router.post('/')
def create_trancsaction(
    data: Transaction,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    user_id = current_user["id"]

    print(f"user_id: {user_id}")

    return Create_transaction(data, db, user_id)