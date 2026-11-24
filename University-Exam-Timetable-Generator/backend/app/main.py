"""
Application entry point — Phase 3.
Initialises FastAPI, registers all Phase-3 routers, and configures CORS.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import health, students, subjects, classrooms, configuration, timetable, sample_data
from app.database import Base, engine

# ---------------------------------------------------------------------------
# Create all database tables on startup
# ---------------------------------------------------------------------------
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="University Exam Timetable Generator",
    description="CSP-based exam timetable generator API",
    version="3.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---------------------------------------------------------------------------
# CORS – allow the Vite dev server on port 5173
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(health.router,         prefix="/api",               tags=["Health"])
app.include_router(students.router,       prefix="/api/students",      tags=["Students"])
app.include_router(subjects.router,       prefix="/api/subjects",      tags=["Subjects"])
app.include_router(classrooms.router,     prefix="/api/classrooms",    tags=["Classrooms"])
app.include_router(configuration.router,  prefix="/api/configuration", tags=["Configuration"])
app.include_router(timetable.router,      prefix="/api/timetable",     tags=["Timetable"])
app.include_router(sample_data.router,    prefix="/api/sample-data",   tags=["Sample Data"])
