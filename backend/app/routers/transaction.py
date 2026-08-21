from app.controllers.auth_controller import login_controller
from app.schemas.transactions import Transaction
from app.schemas.transactions import TransactionListResponse
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.controllers.transaction_controller import Create_transaction,Getcategoriesexpense,Getcategoriesincome,GetSummaryData,GetTransactions
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


@router.get('/categories/expense')
def Get_categories_expense(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    user_id=current_user["id"]
    return Getcategoriesexpense(db,user_id)

@router.get('/categories/income')
def Get_categories_income(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    user_id=current_user["id"]
    return Getcategoriesincome(db,user_id)





@router.get('/summary')
def Get_SummaryData(db:Session=Depends(get_db),current_user=Depends(get_current_user)):
    user_id=current_user["id"]
    return GetSummaryData(db,user_id)


@router.get("/", response_model=TransactionListResponse)
def get_transactions(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["id"]

    return GetTransactions(db, user_id, page, limit)