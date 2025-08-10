from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, Base, SessionLocal
from fastapi.middleware.cors import CORSMiddleware

# Create all tables in the database (if they don't exist)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS to allow frontend access from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins - adjust in production
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


def get_db():
    """
    Dependency to get a database session.
    Ensures session is closed after request finishes.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/users", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    """
    Retrieve and return a list of all users.
    """
    return crud.get_users(db)


@app.post("/users/create", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user with provided data.
    Returns the created user.
    """
    return crud.create_user(db, user)


@app.delete("/user")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user by user_id query parameter.
    Raises 404 if user not found.
    """
    user = crud.delete_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}


@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    """
    Update user data for given user_id.
    Raises 404 if user not found.
    Returns the updated user.
    """
    updated_user = crud.update_user(db, user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user
