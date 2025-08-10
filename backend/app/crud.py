from sqlalchemy.orm import Session
from . import models, schemas
from datetime import date

def calculate_age(dob: date) -> int:
    """
    Calculate age in years based on date of birth.
    Returns an integer age.
    """
    today = date.today()
    age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
    return age


def get_users(db: Session):
    """
    Retrieve all users from the database.
    """
    return db.query(models.User).all()


def create_user(db: Session, user: schemas.UserCreate):
    """
    Create a new user in the database.
    Calculates the age based on date_of_birth before saving.
    """
    age = calculate_age(user.date_of_birth)
    db_user = models.User(
        firstname=user.firstname,
        lastname=user.lastname,
        date_of_birth=user.date_of_birth,
        age=age
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)  # Refresh instance to get updated data from DB
    return db_user


def delete_user(db: Session, user_id: int):
    """
    Delete a user by user_id.
    Returns the deleted user if found, else None.
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user


def update_user(db: Session, user_id: int, user_update: schemas.UserUpdate):
    """
    Update an existing user's data by user_id.
    Updates firstname, lastname, and date_of_birth if provided.
    Recalculates age if date_of_birth is changed.
    Returns the updated user or None if not found.
    """
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
    db.refresh(user)  # Refresh to get latest data from DB
    return user
