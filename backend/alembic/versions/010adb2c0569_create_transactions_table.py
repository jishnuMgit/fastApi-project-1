"""create transactions table

Revision ID: 010adb2c0569
Revises: 3e9f10aa9b94
Create Date: 2026-08-20 20:48:48.567202
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "010adb2c0569"
down_revision: Union[str, Sequence[str], None] = "3e9f10aa9b94"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "transactions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("category", sa.String(), nullable=False),
        sa.Column("cost", sa.Float(), nullable=False),
        sa.Column("addedOn", sa.Date(), nullable=False),
        sa.Column("isIncome", sa.Boolean(), nullable=False),
        sa.Column("note", sa.String(), nullable=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"]
        ),
        sa.PrimaryKeyConstraint("id")
    )


def downgrade() -> None:
    op.drop_table("transactions")