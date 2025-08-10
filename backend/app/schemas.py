from pydantic import BaseModel
from datetime import date
from typing import Optional

class UserBase(BaseModel):
    firstname: str
    lastname: str
    date_of_birth: date

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    firstname: Optional[str] = None
    lastname: Optional[str] = None
    date_of_birth: Optional[date] = None

class User(UserBase):
    id: int
    age: int

    class Config:
        orm_mode = True
