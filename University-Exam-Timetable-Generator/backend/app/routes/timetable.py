"""
Timetable CRUD + constraint routes.
Routes: GET/DELETE /timetable, POST /timetable/generate (stub), GET/POST /constraints
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Timetable, ExamConstraint
from app.schemas.schemas import TimetableCreate, TimetableResponse, ExamConstraintCreate, ExamConstraintResponse

router = APIRouter()


# ── Timetable ──────────────────────────────────────────────────────────────
@router.get("/", response_model=List[TimetableResponse], summary="Get current timetable")
def get_timetable(db: Session = Depends(get_db)):
    return (
        db.query(Timetable)
        .join(Timetable.subject)
        .join(Timetable.classroom)
        .all()
    )


@router.post("/", response_model=TimetableResponse, status_code=status.HTTP_201_CREATED, summary="Add timetable entry manually")
def create_timetable_entry(payload: TimetableCreate, db: Session = Depends(get_db)):
    entry = Timetable(**payload.model_dump())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    # reload with relationships
    return db.query(Timetable).filter(Timetable.id == entry.id).first()


@router.delete("/{entry_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a timetable entry")
def delete_timetable_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = db.query(Timetable).filter(Timetable.id == entry_id).first()
    if not entry:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Timetable entry not found")
    db.delete(entry)
    db.commit()


@router.delete("/", status_code=status.HTTP_204_NO_CONTENT, summary="Clear entire timetable")
def clear_timetable(db: Session = Depends(get_db)):
    db.query(Timetable).delete()
    db.commit()


@router.post("/generate", summary="Generate timetable using CSP solver (Phase 4)")
def generate_timetable(db: Session = Depends(get_db)):
    """CSP solver endpoint — will be fully implemented in Phase 4."""
    return {
        "status": "not_implemented",
        "message": "CSP solver will be integrated in Phase 4. Ensure students, subjects, classrooms, and configuration are set up first.",
    }


# ── Constraints ────────────────────────────────────────────────────────────
@router.get("/constraints", response_model=List[ExamConstraintResponse], summary="List all exam constraints")
def list_constraints(db: Session = Depends(get_db)):
    return db.query(ExamConstraint).all()


@router.post("/constraints", response_model=ExamConstraintResponse, status_code=status.HTTP_201_CREATED, summary="Add exam constraint")
def create_constraint(payload: ExamConstraintCreate, db: Session = Depends(get_db)):
    constraint = ExamConstraint(**payload.model_dump())
    db.add(constraint)
    db.commit()
    db.refresh(constraint)
    return constraint


@router.delete("/constraints/{constraint_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete constraint")
def delete_constraint(constraint_id: int, db: Session = Depends(get_db)):
    c = db.query(ExamConstraint).filter(ExamConstraint.id == constraint_id).first()
    if not c:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Constraint not found")
    db.delete(c)
    db.commit()
