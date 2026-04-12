from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, EmailStr


class UserRegister(BaseModel):
    first_name: str = Field(min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    email: EmailStr
    created_at: datetime


class AuthToken(BaseModel):
    access_token: str
    token_type: str = "bearer"


class AuthResponse(AuthToken):
    user: UserPublic
