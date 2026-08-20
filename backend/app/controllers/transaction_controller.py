from app.models.transactions import Transaction
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