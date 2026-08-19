from fastapi import FastAPI
from sqlalchemy import text
from app.routers import auth, users
from fastapi.middleware.cors import CORSMiddleware 
from app.core.middleware import jwt_middleware

from app.database.database import engine

app = FastAPI()
app.middleware("http")(jwt_middleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/db-test")
def db_test():
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            result.fetchone()

        return {
            "database": "connected"
        }

    except Exception as e:
        return {
            "database": "connection failed",
            "error": str(e)
        }


app.include_router(
    auth.router,
    prefix="/api/v1"
)    
app.include_router(
    users.router,
    prefix="/api/v1"
)

@app.get("/")
def root():
    return {"message": "API is running"}
