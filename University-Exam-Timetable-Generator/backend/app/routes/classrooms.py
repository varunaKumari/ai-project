"""
Classrooms REST API — full CRUD.
Routes: GET/POST /classrooms, GET/PUT/DELETE /classrooms/{id}
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app.models.models import Classroom
from app.schemas.schemas import ClassroomCreate, ClassroomUpdate, ClassroomResponse

router = APIRouter()


# ── List ─────────────────────────────────────────────────────────────────────
@router.get("/", response_model=List[ClassroomResponse], summary="List all classrooms")
def list_classrooms(
    skip:         int           = Query(0, ge=0),
    limit:        int           = Query(100, ge=1, le=500),
    available:    Optional[bool]= Query(None),
    building:     Optional[str] = Query(None),
    min_capacity: Optional[int] = Query(None, ge=1),
    db:           Session       = Depends(get_db),
):
    q = db.query(Classroom)
    if available is not None:
        q = q.filter(Classroom.availability == available)
    if building:
        q = q.filter(Classroom.building.ilike(f"%{building}%"))
    if min_capacity:
        q = q.filter(Classroom.capacity >= min_capacity)
    return q.offset(skip).limit(limit).all()


# ── Get one ───────────────────────────────────────────────────────────────────
@router.get("/{classroom_id}", response_model=ClassroomResponse, summary="Get classroom by ID")
def get_classroom(classroom_id: int, db: Session = Depends(get_db)):
    c = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not c:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Classroom not found")
    return c


# ── Create ────────────────────────────────────────────────────────────────────
@router.post("/", response_model=ClassroomResponse, status_code=status.HTTP_201_CREATED, summary="Create classroom")
def create_classroom(payload: ClassroomCreate, db: Session = Depends(get_db)):
    if db.query(Classroom).filter(Classroom.room_number == payload.room_number).first():
        raise HTTPException(status.HTTP_409_CONFLICT, f"Room number '{payload.room_number}' already exists")
    classroom = Classroom(**payload.model_dump())
    try:
        db.add(classroom)
        db.commit()
        db.refresh(classroom)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "Duplicate room number")
    return classroom


# ── Update ────────────────────────────────────────────────────────────────────
@router.put("/{classroom_id}", response_model=ClassroomResponse, summary="Update classroom")
def update_classroom(classroom_id: int, payload: ClassroomUpdate, db: Session = Depends(get_db)):
    c = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not c:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Classroom not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(c, field, value)
    db.commit()
    db.refresh(c)
    return c


# ── Delete ────────────────────────────────────────────────────────────────────
@router.delete("/{classroom_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete classroom")
def delete_classroom(classroom_id: int, db: Session = Depends(get_db)):
    c = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not c:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Classroom not found")
    db.delete(c)
    db.commit()


# ── Toggle availability ───────────────────────────────────────────────────────
@router.patch("/{classroom_id}/toggle-availability", response_model=ClassroomResponse, summary="Toggle classroom availability")
def toggle_availability(classroom_id: int, db: Session = Depends(get_db)):
    c = db.query(Classroom).filter(Classroom.id == classroom_id).first()
    if not c:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Classroom not found")
    c.availability = not c.availability
    db.commit()
    db.refresh(c)
    return c
