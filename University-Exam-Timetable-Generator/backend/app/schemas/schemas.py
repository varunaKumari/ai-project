"""
Pydantic v2 Schemas — Phase 3
Complete request/response validation for all six models.
"""

from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime


# ─────────────────────────────────────────────────────────────────────────────
# Student
# ─────────────────────────────────────────────────────────────────────────────
class StudentBase(BaseModel):
    name:        str = Field(..., min_length=2, max_length=200)
    roll_number: str = Field(..., min_length=2, max_length=30)
    email:       str = Field(..., min_length=5, max_length=200)
    department:  str = Field(..., min_length=2, max_length=100)
    semester:    int = Field(..., ge=1, le=12)

    @field_validator("email")
    @classmethod
    def email_must_be_valid(cls, v: str) -> str:
        if "@" not in v or "." not in v.split("@")[-1]:
            raise ValueError("Invalid email address")
        return v.lower()

    @field_validator("department")
    @classmethod
    def department_must_not_be_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Department cannot be blank")
        return v.strip()


class StudentCreate(StudentBase):
    pass


class StudentUpdate(BaseModel):
    name:       Optional[str] = Field(None, min_length=2, max_length=200)
    email:      Optional[str] = Field(None, min_length=5, max_length=200)
    department: Optional[str] = Field(None, min_length=2, max_length=100)
    semester:   Optional[int] = Field(None, ge=1, le=12)


class StudentResponse(StudentBase):
    id:         int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────────────────────────────
# Subject
# ─────────────────────────────────────────────────────────────────────────────
class SubjectBase(BaseModel):
    subject_code:      str = Field(..., min_length=2, max_length=20)
    subject_name:      str = Field(..., min_length=2, max_length=200)
    department:        str = Field(..., min_length=2, max_length=100)
    semester:          int = Field(..., ge=1, le=12)
    exam_duration:     int = Field(default=120, ge=30, le=480)
    enrolled_students: int = Field(default=0,   ge=0)
    credits:           int = Field(default=3,   ge=1, le=6)
    instructor:        Optional[str] = Field(None, max_length=200)

    @field_validator("subject_code")
    @classmethod
    def code_uppercase(cls, v: str) -> str:
        return v.strip().upper()


class SubjectCreate(SubjectBase):
    pass


class SubjectUpdate(BaseModel):
    subject_name:      Optional[str] = Field(None, min_length=2, max_length=200)
    department:        Optional[str] = Field(None, min_length=2, max_length=100)
    semester:          Optional[int] = Field(None, ge=1, le=12)
    exam_duration:     Optional[int] = Field(None, ge=30, le=480)
    enrolled_students: Optional[int] = Field(None, ge=0)
    credits:           Optional[int] = Field(None, ge=1, le=6)
    instructor:        Optional[str] = Field(None, max_length=200)


class SubjectResponse(SubjectBase):
    id:         int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────────────────────────────
# Classroom
# ─────────────────────────────────────────────────────────────────────────────
class ClassroomBase(BaseModel):
    room_number:  str = Field(..., min_length=1, max_length=50)
    building:     str = Field(..., min_length=1, max_length=100)
    capacity:     int = Field(..., ge=1, le=2000)
    availability: bool = True
    room_type:    Optional[str] = Field(None, max_length=50)
    facilities:   Optional[str] = Field(None, max_length=500)


class ClassroomCreate(ClassroomBase):
    pass


class ClassroomUpdate(BaseModel):
    building:     Optional[str]  = Field(None, min_length=1, max_length=100)
    capacity:     Optional[int]  = Field(None, ge=1, le=2000)
    availability: Optional[bool] = None
    room_type:    Optional[str]  = Field(None, max_length=50)
    facilities:   Optional[str]  = Field(None, max_length=500)


class ClassroomResponse(ClassroomBase):
    id:         int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────────────────────────────
# ExamConfiguration
# ─────────────────────────────────────────────────────────────────────────────
class ExamConfigBase(BaseModel):
    session_name:   str = Field(default="Fall 2024", max_length=100)
    start_date:     str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    end_date:       str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    start_time:     str = Field(default="08:00", pattern=r"^\d{2}:\d{2}$")
    end_time:       str = Field(default="18:00", pattern=r"^\d{2}:\d{2}$")
    slot_duration:  int = Field(default=120, ge=30,  le=480)
    break_duration: int = Field(default=30,  ge=0,   le=120)

    @field_validator("end_date")
    @classmethod
    def end_after_start(cls, v: str, info) -> str:
        start = info.data.get("start_date")
        if start and v < start:
            raise ValueError("end_date must be after start_date")
        return v


class ExamConfigCreate(ExamConfigBase):
    pass


class ExamConfigResponse(ExamConfigBase):
    id:         int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────────────────────────────
# Timetable
# ─────────────────────────────────────────────────────────────────────────────
class TimetableBase(BaseModel):
    subject_id:   int = Field(..., ge=1)
    classroom_id: int = Field(..., ge=1)
    exam_date:    str = Field(..., pattern=r"^\d{4}-\d{2}-\d{2}$")
    start_time:   str = Field(..., pattern=r"^\d{2}:\d{2}$")
    end_time:     str = Field(..., pattern=r"^\d{2}:\d{2}$")
    status:       str = Field(default="scheduled")
    notes:        Optional[str] = None


class TimetableCreate(TimetableBase):
    pass


class TimetableResponse(TimetableBase):
    id:         int
    subject:    SubjectResponse
    classroom:  ClassroomResponse
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────────────────────────────
# ExamConstraint
# ─────────────────────────────────────────────────────────────────────────────
CONSTRAINT_TYPES = {"must_be_on", "not_on", "preferred_time", "preferred_room", "no_clashes"}


class ExamConstraintBase(BaseModel):
    subject_id:      int = Field(..., ge=1)
    constraint_type: str = Field(..., max_length=50)
    required_date:   Optional[str] = Field(None, pattern=r"^\d{4}-\d{2}-\d{2}$")
    required_time:   Optional[str] = Field(None, pattern=r"^\d{2}:\d{2}$")
    description:     Optional[str] = None

    @field_validator("constraint_type")
    @classmethod
    def valid_constraint(cls, v: str) -> str:
        if v not in CONSTRAINT_TYPES:
            raise ValueError(f"constraint_type must be one of {sorted(CONSTRAINT_TYPES)}")
        return v


class ExamConstraintCreate(ExamConstraintBase):
    pass


class ExamConstraintResponse(ExamConstraintBase):
    id:         int
    created_at: datetime

    class Config:
        from_attributes = True


# ─────────────────────────────────────────────────────────────────────────────
# CSV Upload response
# ─────────────────────────────────────────────────────────────────────────────
class CSVUploadResponse(BaseModel):
    message:         str
    rows_processed:  int
    rows_inserted:   int
    rows_skipped:    int
    errors:          List[str] = []


# ─────────────────────────────────────────────────────────────────────────────
# Sample data load response
# ─────────────────────────────────────────────────────────────────────────────
class SampleDataResponse(BaseModel):
    message:    str
    students:   int
    subjects:   int
    classrooms: int
    config:     int
