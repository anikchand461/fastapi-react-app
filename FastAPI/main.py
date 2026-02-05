from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated
from slalchemy.orm import Session
from pydantic import BaseModel
from database import Sessionlocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
)

class TransactionBase(BaseModel):
    amoun: float
    category: str
    description: str
    is_income: bool
    date: str

class TransactionModel(BaseModel):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = Sessionlocal()
    try: 
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


