from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash
from jose import JWTError, jwt
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("JWT_SECRET_KEY")

ALGORITHM = os.getenv("JWT_ALGORITHM")


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    
    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


def verify_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:
        return None




def passwordhash(password):
    password_hash=PasswordHash.recommended()
    hashed_password=password_hash.hash(password)
    print(hashed_password)
    return hashed_password


def verifypassword(hashed_password,password):
    password_hash=PasswordHash.recommended()
    passtrue=password_hash.verify(password,hashed_password)
    print(passtrue)
    return passtrue


# pass1 = "$argon2id$v=19$m=65536,t=3,p=4$uGDJ6z/4dkFw1bwEX/NdOQ$oCgFl0ZYK7f5U4oa8xuiRqfg8XHWWZ7gkVHC6LeX3/M"
# pass2="12345678"
# verifypassword(pass1,pass2)    
