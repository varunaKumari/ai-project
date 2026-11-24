"""
Timetable business logic service — Phase 3 stub.
Phase 4 will wire in the full CSP backtracking solver with MRV, Degree,
LCV, and Forward Checking heuristics.
"""

from sqlalchemy.orm import Session
from typing import List, Optional

from app.models.models import Timetable


def clear_timetable(db: Session) -> None:
    """Delete all existing timetable entries."""
    db.query(Timetable).delete()
    db.commit()


def get_timetable(db: Session) -> List[Timetable]:
    """Return all scheduled timetable entries."""
    return (
        db.query(Timetable)
        .join(Timetable.subject)
        .join(Timetable.classroom)
        .all()
    )
