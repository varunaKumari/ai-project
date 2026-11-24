"""
Subjects REST API — full CRUD + CSV bulk upload.
Routes: GET/POST /subjects, GET/PUT/DELETE /subjects/{id}, POST /subjects/upload-csv
"""

import csv, io
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app.models.models import Subject
from app.schemas.schemas import SubjectCreate, SubjectUpdate, SubjectResponse, CSVUploadResponse

router = APIRouter()


# ── List ─────────────────────────────────────────────────────────────────────
@router.get("/", response_model=List[SubjectResponse], summary="List all subjects")
def list_subjects(
    skip:       int           = Query(0, ge=0),
    limit:      int           = Query(100, ge=1, le=500),
    department: Optional[str] = Query(None),
    semester:   Optional[int] = Query(None, ge=1, le=12),
    search:     Optional[str] = Query(None, description="Search by name or code"),
    db:         Session       = Depends(get_db),
):
    q = db.query(Subject)
    if department:
        q = q.filter(Subject.department.ilike(f"%{department}%"))
    if semester:
        q = q.filter(Subject.semester == semester)
    if search:
        q = q.filter(
            Subject.subject_name.ilike(f"%{search}%") |
            Subject.subject_code.ilike(f"%{search}%")
        )
    return q.offset(skip).limit(limit).all()


# ── Get one ───────────────────────────────────────────────────────────────────
@router.get("/{subject_id}", response_model=SubjectResponse, summary="Get subject by ID")
def get_subject(subject_id: int, db: Session = Depends(get_db)):
    s = db.query(Subject).filter(Subject.id == subject_id).first()
    if not s:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Subject not found")
    return s


# ── Create ────────────────────────────────────────────────────────────────────
@router.post("/", response_model=SubjectResponse, status_code=status.HTTP_201_CREATED, summary="Create subject")
def create_subject(payload: SubjectCreate, db: Session = Depends(get_db)):
    if db.query(Subject).filter(Subject.subject_code == payload.subject_code).first():
        raise HTTPException(status.HTTP_409_CONFLICT, f"Subject code '{payload.subject_code}' already exists")
    subject = Subject(**payload.model_dump())
    try:
        db.add(subject)
        db.commit()
        db.refresh(subject)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "Duplicate subject code")
    return subject


# ── Update ────────────────────────────────────────────────────────────────────
@router.put("/{subject_id}", response_model=SubjectResponse, summary="Update subject")
def update_subject(subject_id: int, payload: SubjectUpdate, db: Session = Depends(get_db)):
    s = db.query(Subject).filter(Subject.id == subject_id).first()
    if not s:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Subject not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(s, field, value)
    db.commit()
    db.refresh(s)
    return s


# ── Delete ────────────────────────────────────────────────────────────────────
@router.delete("/{subject_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete subject")
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    s = db.query(Subject).filter(Subject.id == subject_id).first()
    if not s:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Subject not found")
    db.delete(s)
    db.commit()


# ── CSV Bulk Upload (enrollment) ──────────────────────────────────────────────
@router.post(
    "/upload-csv",
    response_model=CSVUploadResponse,
    summary="Bulk upload subjects from CSV",
    description=(
        "Upload a CSV with columns: subject_code, subject_name, department, semester, "
        "exam_duration, enrolled_students, credits, instructor (optional).\n"
        "Rows with duplicate subject_code are skipped."
    ),
)
async def upload_subjects_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Only .csv files are accepted")

    content = await file.read()
    text    = content.decode("utf-8-sig")
    reader  = csv.DictReader(io.StringIO(text))

    required = {"subject_code", "subject_name", "department", "semester", "exam_duration", "enrolled_students"}
    if not required.issubset(set(reader.fieldnames or [])):
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            f"CSV must contain columns: {sorted(required)}"
        )

    inserted, skipped, errors = 0, 0, []

    for i, row in enumerate(reader, start=2):
        try:
            payload = SubjectCreate(
                subject_code=row["subject_code"].strip(),
                subject_name=row["subject_name"].strip(),
                department=row["department"].strip(),
                semester=int(row["semester"].strip()),
                exam_duration=int(row["exam_duration"].strip()),
                enrolled_students=int(row["enrolled_students"].strip()),
                credits=int(row.get("credits", "3").strip() or "3"),
                instructor=row.get("instructor", "").strip() or None,
            )
        except Exception as e:
            errors.append(f"Row {i}: {e}")
            skipped += 1
            continue

        if db.query(Subject).filter(Subject.subject_code == payload.subject_code).first():
            errors.append(f"Row {i}: duplicate code '{payload.subject_code}' — skipped")
            skipped += 1
            continue

        db.add(Subject(**payload.model_dump()))
        inserted += 1

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, "Database commit failed")

    return CSVUploadResponse(
        message=f"CSV processed: {inserted} inserted, {skipped} skipped",
        rows_processed=inserted + skipped,
        rows_inserted=inserted,
        rows_skipped=skipped,
        errors=errors[:20],
    )
