from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.security import verify_token


PUBLIC_PATHS = {
    "/",
    "/api/v1/auth/login",
    "/api/v1/auth/register",
    # "/api/v1/auth/login"
    "/docs",
    "/openapi.json",
    "/redoc",
}

# Jishnu123456@ jishnu@gmail.com


async def jwt_middleware(request: Request, call_next):

    if request.url.path in PUBLIC_PATHS:
        print(request.url.path)
        return await call_next(request)

    authorization = request.headers.get("Authorization")

    if not authorization:
        return JSONResponse(
            status_code=401,
            content={"detail": "Authorization header missing"}
        )

    try:
        scheme, token = authorization.split(" ", 1)
    except ValueError:
        return JSONResponse(
            status_code=401,
            content={"detail": "Invalid authorization header"}
        )

    if scheme.lower() != "bearer":
        return JSONResponse(
            status_code=401,
            content={"detail": "Bearer token required"}
        )

    payload = verify_token(token)

    if payload is None:
        return JSONResponse(
            status_code=401,
            content={"detail": "Invalid or expired token"}
        )

    request.state.user = payload

    return await call_next(request)