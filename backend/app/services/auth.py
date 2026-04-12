from datetime import timedelta

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.schemas.auth import AuthResponse, UserLogin, UserPublic, UserRegister


def normalize_email(email: str) -> str:
    return email.strip().lower()


def get_user_by_email(db: Session, email: str) -> User | None:
    statement = select(User).where(User.email == normalize_email(email))
    return db.scalar(statement)


def build_auth_response(user: User) -> AuthResponse:
    token = create_access_token(
        subject=str(user.id),
        expires_delta=timedelta(minutes=settings.access_token_expire_minutes),
    )
    return AuthResponse(
        access_token=token,
        user=UserPublic.model_validate(user),
    )


def register_user(db: Session, payload: UserRegister) -> AuthResponse:
    if get_user_by_email(db, payload.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account already exists with this email address.",
        )

    user = User(
        email=normalize_email(payload.email),
        first_name=payload.first_name.strip().title(),
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return build_auth_response(user)


def authenticate_user(db: Session, payload: UserLogin) -> AuthResponse:
    user = get_user_by_email(db, payload.email)
    if user is None or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email or password is invalid.",
        )

    return build_auth_response(user)
