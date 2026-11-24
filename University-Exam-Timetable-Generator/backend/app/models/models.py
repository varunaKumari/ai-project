"""
SQLAlchemy ORM Models — Phase 3
All six domain models for the University Exam Timetable Generator.
"""

from sqlalchemy import (
    Column, Integer, String, Boolean, ForeignKey,
    DateTime, Date, Time, Text, Float,
)
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


# ─────────────────────────────────────────────────────────────────────────────
# 1. Student
# ─────────────────────────────────────────────────────────────────────────────
class Student(Base):
    __tablename__ = "students"

    id           = Column(Integer, primary_key=True, index=True)
    name         = Column(String(200), nullable=False)
    roll_number  = Column(String(30),  nullable=False, unique=True, index=True)
    email        = Column(String(200), nullable=False, unique=True)
    department   = Column(String(100), nullable=False)
    semester     = Column(Integer,     nullable=False)
    created_at   = Column(DateTime,    default=datetime.utcnow)
    updated_at   = Column(DateTime,    default=datetime.utcnow, onupdate=datetime.utcnow)


# ─────────────────────────────────────────────────────────────────────────────
# 2. Subject
# ─────────────────────────────────────────────────────────────────────────────
class Subject(Base):
    __tablename__ = "subjects"

    id                 = Column(Integer, primary_key=True, index=True)
    subject_code       = Column(String(20),  nullable=False, unique=True, index=True)
    subject_name       = Column(String(200), nullable=False)
    department         = Column(String(100), nullable=False)
    semester           = Column(Integer,     nullable=False)
    exam_duration      = Column(Integer,     nullable=False, default=120)   # minutes
    enrolled_students  = Column(Integer,     nullable=False, default=0)
    credits            = Column(Integer,     nullable=False, default=3)
    instructor         = Column(String(200), nullable=True)
    created_at         = Column(DateTime,    default=datetime.utcnow)
    updated_at         = Column(DateTime,    default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    timetable_entries  = relationship("Timetable",      back_populates="subject")
    constraints        = relationship("ExamConstraint", back_populates="subject",
                                      cascade="all, delete-orphan")


# ─────────────────────────────────────────────────────────────────────────────
# 3. Classroom
# ─────────────────────────────────────────────────────────────────────────────
class Classroom(Base):
    __tablename__ = "classrooms"

    id           = Column(Integer, primary_key=True, index=True)
    room_number  = Column(String(50),  nullable=False, unique=True, index=True)
    building     = Column(String(100), nullable=False)
    capacity     = Column(Integer,     nullable=False)
    availability = Column(Boolean,     default=True)
    room_type    = Column(String(50),  nullable=True)   # e.g. "Exam Hall", "Lab"
    facilities   = Column(Text,        nullable=True)   # comma-separated list
    created_at   = Column(DateTime,    default=datetime.utcnow)
    updated_at   = Column(DateTime,    default=datetime.utcnow, onupdate=datetime.utcnow)

    timetable_entries = relationship("Timetable", back_populates="classroom")


# ─────────────────────────────────────────────────────────────────────────────
# 4. ExamConfiguration  (singleton — only one active config at a time)
# ─────────────────────────────────────────────────────────────────────────────
class ExamConfiguration(Base):
    __tablename__ = "exam_configurations"

    id             = Column(Integer, primary_key=True, index=True)
    session_name   = Column(String(100), nullable=False, default="Fall 2024")
    start_date     = Column(String(20),  nullable=False)   # ISO 8601 date string
    end_date       = Column(String(20),  nullable=False)
    start_time     = Column(String(10),  nullable=False, default="08:00")  # HH:MM
    end_time       = Column(String(10),  nullable=False, default="18:00")
    slot_duration  = Column(Integer,     nullable=False, default=120)       # minutes
    break_duration = Column(Integer,     nullable=False, default=30)        # minutes
    created_at     = Column(DateTime,    default=datetime.utcnow)
    updated_at     = Column(DateTime,    default=datetime.utcnow, onupdate=datetime.utcnow)


# ─────────────────────────────────────────────────────────────────────────────
# 5. Timetable  (one row per scheduled exam)
# ─────────────────────────────────────────────────────────────────────────────
class Timetable(Base):
    __tablename__ = "timetable"

    id           = Column(Integer, primary_key=True, index=True)
    subject_id   = Column(Integer, ForeignKey("subjects.id"),   nullable=False)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=False)
    exam_date    = Column(String(20),  nullable=False)   # ISO date string
    start_time   = Column(String(10),  nullable=False)   # HH:MM
    end_time     = Column(String(10),  nullable=False)
    status       = Column(String(20),  default="scheduled")  # scheduled | confirmed | cancelled
    notes        = Column(Text,        nullable=True)
    created_at   = Column(DateTime,    default=datetime.utcnow)
    updated_at   = Column(DateTime,    default=datetime.utcnow, onupdate=datetime.utcnow)

    subject   = relationship("Subject",   back_populates="timetable_entries")
    classroom = relationship("Classroom", back_populates="timetable_entries")


# ─────────────────────────────────────────────────────────────────────────────
# 6. ExamConstraint  (hard constraints for the CSP solver)
# ─────────────────────────────────────────────────────────────────────────────
class ExamConstraint(Base):
    __tablename__ = "exam_constraints"

    id              = Column(Integer, primary_key=True, index=True)
    subject_id      = Column(Integer, ForeignKey("subjects.id"), nullable=False)
    constraint_type = Column(String(50),  nullable=False)   # e.g. "must_be_on", "not_on", "preferred_time"
    required_date   = Column(String(20),  nullable=True)
    required_time   = Column(String(10),  nullable=True)
    description     = Column(Text,        nullable=True)
    created_at      = Column(DateTime,    default=datetime.utcnow)

    subject = relationship("Subject", back_populates="constraints")
