"""
Exam CRUD routes.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.models import Exam
from app.schemas.schemas import ExamCreate, ExamResponse

router = APIRouter()


@router.get("/", response_model=List[ExamResponse], summary="List all exams")
def list_exams(db: Session = Depends(get_db)):
    return db.query(Exam).all()


@router.get("/{exam_id}", response_model=ExamResponse, summary="Get exam by ID")
def get_exam(exam_id: int, db: Session = Depends(get_db)):
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exam not found")
    return exam


@router.post("/", response_model=ExamResponse, status_code=status.HTTP_201_CREATED, summary="Create exam")
def create_exam(payload: ExamCreate, db: Session = Depends(get_db)):
    existing = db.query(Exam).filter(Exam.course_code == payload.course_code).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Exam with course code '{payload.course_code}' already exists",
        )
    exam = Exam(**payload.model_dump())
    db.add(exam)
    db.commit()
    db.refresh(exam)
    return exam


@router.put("/{exam_id}", response_model=ExamResponse, summary="Update exam")
def update_exam(exam_id: int, payload: ExamCreate, db: Session = Depends(get_db)):
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exam not found")
    for field, value in payload.model_dump().items():
        setattr(exam, field, value)
    db.commit()
    db.refresh(exam)
    return exam


@router.delete("/{exam_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete exam")
def delete_exam(exam_id: int, db: Session = Depends(get_db)):
    exam = db.query(Exam).filter(Exam.id == exam_id).first()
    if not exam:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Exam not found")
    db.delete(exam)
    db.commit()
