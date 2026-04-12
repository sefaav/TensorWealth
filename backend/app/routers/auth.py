from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.auth import AuthResponse, UserLogin, UserRegister
from app.services.auth import authenticate_user, register_user

router = APIRouter(prefix="/auth", tags=["auth"])
DbSession = Annotated[Session, Depends(get_db)]


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: UserRegister, db: DbSession) -> AuthResponse:
    return register_user(db, payload)


@router.post("/login", response_model=AuthResponse)
def login(payload: UserLogin, db: DbSession) -> AuthResponse:
    return authenticate_user(db, payload)
