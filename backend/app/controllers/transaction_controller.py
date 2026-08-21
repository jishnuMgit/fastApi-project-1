from app.models.transactions import Transaction
from app.schemas.transactions import Transaction as TransactionSchemas
def Create_transaction(data, db, user_id):
    transaction = Transaction(
        name=data.name,
        category=data.category,
        cost=data.cost,
        addedOn=data.addedOn,
        isIncome=data.isIncome,
        note=data.note,
        user_id=user_id
    )

    db.add(transaction)
    db.commit()
    db.refresh(transaction)

    return transaction


def Getcategoriesexpense(db, user_id):
    transactions = db.query(Transaction).filter(
        Transaction.user_id == user_id,
        Transaction.isIncome == False
    ).all()

    return transactions

def Getcategoriesincome(db,user_id):
    transaction=db.query(Transaction).filter(
        Transaction.user_id==user_id,
        Transaction.isIncome==True
        
    ).all()

    return transaction


def GetSummaryData(db, user_id):
    transactions = db.query(Transaction).filter(
        Transaction.user_id == user_id
    ).all()

    totalIncome = 0
    totalExpenses = 0

    for transaction in transactions:
        if transaction.isIncome:
            totalIncome += transaction.cost
        else:
            totalExpenses += transaction.cost

    return {
        "totalIncome": totalIncome,
        "totalExpenses": totalExpenses,
        "balance":1500
    }


def GetTransactions(db, user_id, page=1, limit=10):
    skip = (page - 1) * limit

    query = db.query(Transaction).filter(
        Transaction.user_id == user_id
    )

    total = query.count()

    transactions = query.offset(skip).limit(limit).all()

    totalPages = (total + limit - 1) // limit

    return {
        "transactions": transactions,
        "totalPages": totalPages
    }