from sqlalchemy import Column, Integer, String, Boolean, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(50), nullable=False)

    category = Column(String(120), nullable=False)

    cost = Column(Float, nullable=False)

    addedOn = Column(Date, nullable=False)

    isIncome = Column(Boolean, nullable=False, default=False)

    note = Column(String(255), nullable=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    user = relationship("User", back_populates="transactions")