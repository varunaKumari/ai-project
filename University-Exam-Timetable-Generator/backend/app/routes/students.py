"""
Students REST API — full CRUD + CSV bulk upload.
Routes: GET/POST /students, GET/PUT/DELETE /students/{id}, POST /students/upload-csv
"""

import csv, io
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app.models.models import Student
from app.schemas.schemas import StudentCreate, StudentUpdate, StudentResponse, CSVUploadResponse

router = APIRouter()


# ── List ─────────────────────────────────────────────────────────────────────
@router.get("/", response_model=List[StudentResponse], summary="List all students")
def list_students(
    skip:       int            = Query(0,    ge=0),
    limit:      int            = Query(100,  ge=1, le=500),
    department: Optional[str]  = Query(None),
    semester:   Optional[int]  = Query(None, ge=1, le=12),
    search:     Optional[str]  = Query(None, description="Search by name or roll number"),
    db:         Session        = Depends(get_db),
):
    q = db.query(Student)
    if department:
        q = q.filter(Student.department.ilike(f"%{department}%"))
    if semester:
        q = q.filter(Student.semester == semester)
    if search:
        q = q.filter(
            Student.name.ilike(f"%{search}%") |
            Student.roll_number.ilike(f"%{search}%")
        )
    return q.offset(skip).limit(limit).all()


# ── Get one ───────────────────────────────────────────────────────────────────
@router.get("/{student_id}", response_model=StudentResponse, summary="Get student by ID")
def get_student(student_id: int, db: Session = Depends(get_db)):
    s = db.query(Student).filter(Student.id == student_id).first()
    if not s:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Student not found")
    return s


# ── Create ────────────────────────────────────────────────────────────────────
@router.post("/", response_model=StudentResponse, status_code=status.HTTP_201_CREATED, summary="Create student")
def create_student(payload: StudentCreate, db: Session = Depends(get_db)):
    if db.query(Student).filter(Student.roll_number == payload.roll_number).first():
        raise HTTPException(status.HTTP_409_CONFLICT, f"Roll number '{payload.roll_number}' already exists")
    if db.query(Student).filter(Student.email == payload.email.lower()).first():
        raise HTTPException(status.HTTP_409_CONFLICT, f"Email '{payload.email}' already exists")
    student = Student(**payload.model_dump())
    try:
        db.add(student)
        db.commit()
        db.refresh(student)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "Duplicate roll number or email")
    return student


# ── Update ────────────────────────────────────────────────────────────────────
@router.put("/{student_id}", response_model=StudentResponse, summary="Update student")
def update_student(student_id: int, payload: StudentUpdate, db: Session = Depends(get_db)):
    s = db.query(Student).filter(Student.id == student_id).first()
    if not s:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Student not found")
    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(s, field, value)
    try:
        db.commit()
        db.refresh(s)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status.HTTP_409_CONFLICT, "Email already in use by another student")
    return s


# ── Delete ────────────────────────────────────────────────────────────────────
@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete student")
def delete_student(student_id: int, db: Session = Depends(get_db)):
    s = db.query(Student).filter(Student.id == student_id).first()
    if not s:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Student not found")
    db.delete(s)
    db.commit()


# ── CSV Bulk Upload ───────────────────────────────────────────────────────────
@router.post(
    "/upload-csv",
    response_model=CSVUploadResponse,
    summary="Bulk upload students from CSV",
    description=(
        "Upload a CSV file with columns: name, roll_number, email, department, semester.\n"
        "Rows with duplicate roll_number or email are skipped."
    ),
)
async def upload_students_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Only .csv files are accepted")

    content = await file.read()
    text    = content.decode("utf-8-sig")  # strip BOM if present
    reader  = csv.DictReader(io.StringIO(text))

    required = {"name", "roll_number", "email", "department", "semester"}
    if not required.issubset(set(reader.fieldnames or [])):
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_ENTITY,
            f"CSV must contain columns: {sorted(required)}"
        )

    inserted, skipped, errors = 0, 0, []

    for i, row in enumerate(reader, start=2):
        try:
            payload = StudentCreate(
                name=row["name"].strip(),
                roll_number=row["roll_number"].strip(),
                email=row["email"].strip(),
                department=row["department"].strip(),
                semester=int(row["semester"].strip()),
            )
        except Exception as e:
            errors.append(f"Row {i}: validation error — {e}")
            skipped += 1
            continue

        exists = (
            db.query(Student).filter(
                (Student.roll_number == payload.roll_number) |
                (Student.email == payload.email)
            ).first()
        )
        if exists:
            errors.append(f"Row {i}: duplicate roll_number or email — skipped")
            skipped += 1
            continue

        db.add(Student(**payload.model_dump()))
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
        errors=errors[:20],  # cap error list to 20 entries
    )
