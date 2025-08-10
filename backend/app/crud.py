from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date

def calculate_age(dob: date) -> int:
    today = date.today()
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    return age

def get_users(db: Session):
    return db.query(models.User).all()

def create_user(db: Session, user: schemas.UserCreate):
    age = calculate_age(user.date_of_birth)
    db_user = models.User(
        firstname=user.firstname,
        lastname=user.lastname,
        date_of_birth=user.date_of_birth,
        age=age
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

