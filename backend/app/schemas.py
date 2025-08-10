from pydantic import BaseModel
from datetime import date
from typing import Optional

class UserBase(BaseModel):
    firstname: str
    lastname: str
    date_of_birth: date

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    age: int

    class Config:
        orm_mode = True
