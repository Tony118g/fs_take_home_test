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

def delete_user(db: Session, user_id: int):
    user = db.query(models.User).get(user_id)
    if user:
        db.delete(user)
        db.commit()
    return user

def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    user = db.query(models.User).get(user_id)
    if not user:
        return None

    if user_update.firstname is not None:
        user.firstname = user_update.firstname
    if user_update.lastname is not None:
        user.lastname = user_update.lastname
    if user_update.date_of_birth is not None:
        user.date_of_birth = user_update.date_of_birth
        user.age = calculate_age(user_update.date_of_birth)

    db.commit()
    db.refresh(user)
    return user
