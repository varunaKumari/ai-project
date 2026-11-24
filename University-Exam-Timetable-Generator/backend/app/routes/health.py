"""
Health-check route.
"""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health", summary="Health check")
def health_check():
    """Returns a simple status message to confirm the API is running."""
    return {
        "status": "ok",
        "message": "University Exam Timetable Generator API is running",
        "version": "1.0.0",
    }
