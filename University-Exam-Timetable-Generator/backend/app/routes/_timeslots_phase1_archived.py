"""
TimeSlot CRUD routes.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.models import TimeSlot
from app.schemas.schemas import TimeSlotCreate, TimeSlotResponse

router = APIRouter()


@router.get("/", response_model=List[TimeSlotResponse], summary="List all time slots")
def list_timeslots(db: Session = Depends(get_db)):
    return db.query(TimeSlot).all()


@router.get("/{slot_id}", response_model=TimeSlotResponse, summary="Get time slot by ID")
def get_timeslot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(TimeSlot).filter(TimeSlot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Time slot not found")
    return slot


@router.post("/", response_model=TimeSlotResponse, status_code=status.HTTP_201_CREATED, summary="Create time slot")
def create_timeslot(payload: TimeSlotCreate, db: Session = Depends(get_db)):
    slot = TimeSlot(**payload.model_dump())
    db.add(slot)
    db.commit()
    db.refresh(slot)
    return slot


@router.put("/{slot_id}", response_model=TimeSlotResponse, summary="Update time slot")
def update_timeslot(slot_id: int, payload: TimeSlotCreate, db: Session = Depends(get_db)):
    slot = db.query(TimeSlot).filter(TimeSlot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Time slot not found")
    for field, value in payload.model_dump().items():
        setattr(slot, field, value)
    db.commit()
    db.refresh(slot)
    return slot


@router.delete("/{slot_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete time slot")
def delete_timeslot(slot_id: int, db: Session = Depends(get_db)):
    slot = db.query(TimeSlot).filter(TimeSlot.id == slot_id).first()
    if not slot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Time slot not found")
    db.delete(slot)
    db.commit()
