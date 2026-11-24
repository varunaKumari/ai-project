"""
Sample Data API — load / clear sample dataset.
Routes: POST /api/sample-data/load, DELETE /api/sample-data/clear
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.sample_data_service import load_sample_data, clear_all_data
from app.schemas.schemas import SampleDataResponse

router = APIRouter()


@router.post(
    "/load",
    response_model=SampleDataResponse,
    summary="Load sample dataset",
    description=(
        "Inserts 50 students, 20 subjects, 8 classrooms, and 1 exam configuration.\n"
        "Skips rows that already exist — safe to call multiple times."
    ),
)
def load_sample(db: Session = Depends(get_db)):
    counts = load_sample_data(db)
    return SampleDataResponse(
        message=(
            f"Sample data ready — "
            f"{counts['students']} students, "
            f"{counts['subjects']} subjects, "
            f"{counts['classrooms']} classrooms, "
            f"{counts['config']} configuration(s) in database."
        ),
        **counts,
    )


@router.delete(
    "/clear",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Clear all data",
    description="⚠️ Permanently deletes ALL students, subjects, classrooms, timetable entries, and configuration.",
)
def clear_sample(db: Session = Depends(get_db)):
    clear_all_data(db)
