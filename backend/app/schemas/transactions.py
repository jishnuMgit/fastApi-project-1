from datetime import date
from pydantic import BaseModel, Field, StrictBool


class Transaction(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    category: str = Field(min_length=1, max_length=120)
    cost: float = Field(gt=0)
    addedOn: date
    isIncome: StrictBool
    note: str = Field(max_length=255)