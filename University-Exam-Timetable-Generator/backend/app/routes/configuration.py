"""
Exam Configuration API — GET current config, POST to create/replace.
Routes: GET /configuration, POST /configuration
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import ExamConfiguration
from app.schemas.schemas import ExamConfigCreate, ExamConfigResponse

router = APIRouter()


@router.get("/", response_model=List[ExamConfigResponse], summary="Get all exam configurations")
def get_configurations(db: Session = Depends(get_db)):
    return db.query(ExamConfiguration).order_by(ExamConfiguration.id.desc()).all()


@router.get("/active", response_model=ExamConfigResponse, summary="Get the latest active configuration")
def get_active_configuration(db: Session = Depends(get_db)):
    config = db.query(ExamConfiguration).order_by(ExamConfiguration.id.desc()).first()
    if not config:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "No configuration found. Please create one first.")
    return config


@router.post(
    "/",
    response_model=ExamConfigResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new exam configuration",
    description="Creates a new exam configuration. Multiple configurations are allowed; use /active to get the latest.",
)
def create_configuration(payload: ExamConfigCreate, db: Session = Depends(get_db)):
    config = ExamConfiguration(**payload.model_dump())
    db.add(config)
    db.commit()
    db.refresh(config)
    return config


@router.put("/{config_id}", response_model=ExamConfigResponse, summary="Update an exam configuration")
def update_configuration(config_id: int, payload: ExamConfigCreate, db: Session = Depends(get_db)):
    config = db.query(ExamConfiguration).filter(ExamConfiguration.id == config_id).first()
    if not config:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Configuration not found")
    for field, value in payload.model_dump().items():
        setattr(config, field, value)
    db.commit()
    db.refresh(config)
    return config


@router.delete("/{config_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete a configuration")
def delete_configuration(config_id: int, db: Session = Depends(get_db)):
    config = db.query(ExamConfiguration).filter(ExamConfiguration.id == config_id).first()
    if not config:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Configuration not found")
    db.delete(config)
    db.commit()
