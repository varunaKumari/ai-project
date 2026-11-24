# University Exam Timetable Generator

> An AI-powered exam scheduling system built as a university course project demonstrating **Constraint Satisfaction Problem (CSP)** techniques with Backtracking Search, MRV, Degree Heuristic, Least Constraining Value (LCV), and Forward Checking.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 8, Tailwind CSS v4, Lucide React, Recharts |
| Backend | Python 3.13, FastAPI, Uvicorn |
| Database | SQLite via SQLAlchemy |
| AI Engine | CSP + Backtracking, MRV, Degree, LCV, Forward Checking |

---

## Project Structure

```
University-Exam-Timetable-Generator/
├── frontend/                        # React + Vite application
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js            # Axios API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   └── HomePage.jsx         # Dashboard page
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                # Tailwind CSS v4 entry
│   ├── vite.config.js               # Vite + Tailwind + proxy config
│   └── package.json
│
├── backend/                         # FastAPI application
│   ├── app/
│   │   ├── main.py                  # FastAPI app, CORS, routers
│   │   ├── database.py              # SQLAlchemy engine & session
│   │   ├── routes/
│   │   │   ├── health.py            # GET /api/health
│   │   │   ├── students.py          # Full CRUD + CSV upload /api/students/
│   │   │   ├── subjects.py          # Full CRUD + CSV upload /api/subjects/
│   │   │   ├── classrooms.py        # Full CRUD /api/classrooms/
│   │   │   ├── configuration.py     # Exam config /api/configuration/
│   │   │   ├── timetable.py         # Timetable + constraints /api/timetable/
│   │   │   └── sample_data.py       # Load/clear sample data /api/sample-data/
│   │   ├── models/
│   │   │   └── models.py            # SQLAlchemy ORM models
│   │   ├── schemas/
│   │   │   └── schemas.py           # Pydantic request/response schemas
│   │   ├── services/
│   │   │   └── timetable_service.py # Business logic / solver orchestration
│   │   └── ai_engine/
│   │       └── csp_solver.py        # CSP solver (Phase 2)
│   ├── venv/                        # Python virtual environment
│   ├── requirements.txt
│   └── exam_timetable.db            # SQLite DB (auto-created on first run)
│
└── README.md
```

---

## Prerequisites

- **Node.js** ≥ 18 and **npm** ≥ 9
- **Python** ≥ 3.11

---

## Installation

### 1 — Clone / Navigate to the project

```bash
cd "University-Exam-Timetable-Generator"
```

### 2 — Backend Setup

```bash
# Enter backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
.\venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3 — Frontend Setup

```bash
# Enter frontend folder (from project root)
cd frontend

# Install npm packages
npm install
```

---

## Running the Application

### Start the Backend (Terminal 1)

```bash
cd backend

# Windows
.\venv\Scripts\activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# macOS / Linux
source venv/bin/activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at: **http://127.0.0.1:8000**  
Interactive docs (Swagger UI): **http://127.0.0.1:8000/docs**

### Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The UI will be available at: **http://localhost:5173**

---

## API Endpoints

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |

### Students
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students/` | List students (filter by dept/semester/search) |
| POST | `/api/students/` | Create a student |
| GET | `/api/students/{id}` | Get student by ID |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |
| POST | `/api/students/upload-csv` | Bulk upload from CSV |

### Subjects
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/subjects/` | List subjects |
| POST | `/api/subjects/` | Create a subject |
| PUT | `/api/subjects/{id}` | Update subject |
| DELETE | `/api/subjects/{id}` | Delete subject |
| POST | `/api/subjects/upload-csv` | Bulk upload from CSV |

### Classrooms
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/classrooms/` | List classrooms |
| POST | `/api/classrooms/` | Create a classroom |
| PUT | `/api/classrooms/{id}` | Update classroom |
| DELETE | `/api/classrooms/{id}` | Delete classroom |
| PATCH | `/api/classrooms/{id}/toggle-availability` | Toggle availability |

### Configuration
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/configuration/` | List all configs |
| GET | `/api/configuration/active` | Get active config |
| POST | `/api/configuration/` | Create config |
| PUT | `/api/configuration/{id}` | Update config |
| DELETE | `/api/configuration/{id}` | Delete config |

### Timetable & Constraints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/timetable/` | View current timetable |
| POST | `/api/timetable/` | Add a manual entry |
| DELETE | `/api/timetable/{id}` | Delete an entry |
| DELETE | `/api/timetable/` | Clear entire timetable |
| POST | `/api/timetable/generate` | Run CSP solver (Phase 4) |
| GET | `/api/timetable/constraints` | List constraints |
| POST | `/api/timetable/constraints` | Add constraint |
| DELETE | `/api/timetable/constraints/{id}` | Delete constraint |

### Sample Data
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/sample-data/load` | Load 50 students, 20 subjects, 8 rooms |
| DELETE | `/api/sample-data/clear` | Clear all sample data |

---

## AI Algorithm

The CSP solver (implemented in Phase 2) uses the following techniques:

1. **Backtracking Search** — depth-first search with constraint checking
2. **MRV (Minimum Remaining Values)** — choose the exam with the fewest legal slots
3. **Degree Heuristic** — tie-break by number of constraints with other exams
4. **LCV (Least Constraining Value)** — assign the value that rules out fewest options
5. **Forward Checking** — prune domains of remaining exams after each assignment

### Constraints

- No two exams share the same room at the same time
- Room capacity must be ≥ number of exam students
- No student can sit two exams simultaneously (no clashes)

---

## Development Phases

| Phase | Status | Description |
|---|---|---|
| Phase 1 | ✅ Complete | Project scaffold, health check API, frontend Vite+React+Tailwind |
| Phase 2 | ✅ Complete | Professional 11-page dashboard UI (all sample data) |
| Phase 3 | ✅ Complete | 6 DB models, full CRUD APIs, CSV upload, 50-student sample dataset |
| Phase 4 | 🔜 Planned | Frontend ↔ Backend integration, real data in all UI pages |
| Phase 5 | 🔜 Planned | Full CSP solver (Backtracking + MRV + Degree + LCV + Forward Checking) |

---

## License

MIT — Free for academic and personal use.
