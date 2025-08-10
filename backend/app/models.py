from sqlalchemy import Column, Integer, String, Date
from .database import Base

class User(Base):
    """
    SQLAlchemy User model representing the 'users' table in the database.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    # User's first name, required field
    firstname = Column(String, nullable=False)
    # User's last name, required field
    lastname = Column(String, nullable=False)
    # User's date of birth, stored as a date, required field
    date_of_birth = Column(Date, nullable=False)
    # User's age, stored as an integer, required field
    age = Column(Integer, nullable=False)
