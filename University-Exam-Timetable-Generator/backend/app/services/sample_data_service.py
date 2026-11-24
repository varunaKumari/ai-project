"""
Sample data service.
Loads a realistic dataset: 50 students, 20 subjects, 8 classrooms, 1 exam config.
Called via POST /api/sample-data/load
"""

from sqlalchemy.orm import Session
from app.models.models import Student, Subject, Classroom, ExamConfiguration

# ─────────────────────────────────────────────────────────────────────────────
# 50 Sample Students
# ─────────────────────────────────────────────────────────────────────────────
STUDENTS = [
    # Computer Science — Semester 7
    {"name": "Aisha Rahman",    "roll_number": "CS-21-001", "email": "aisha.rahman@uni.edu",    "department": "Computer Science",        "semester": 7},
    {"name": "Bilal Ahmed",     "roll_number": "CS-21-002", "email": "bilal.ahmed@uni.edu",     "department": "Computer Science",        "semester": 7},
    {"name": "Sara Khan",       "roll_number": "CS-21-003", "email": "sara.khan@uni.edu",       "department": "Computer Science",        "semester": 7},
    {"name": "Hina Qureshi",    "roll_number": "CS-21-004", "email": "hina.qureshi@uni.edu",    "department": "Computer Science",        "semester": 7},
    {"name": "Ayesha Nawaz",    "roll_number": "CS-21-005", "email": "ayesha.nawaz@uni.edu",    "department": "Computer Science",        "semester": 7},
    {"name": "Farhan Malik",    "roll_number": "CS-21-006", "email": "farhan.malik@uni.edu",    "department": "Computer Science",        "semester": 7},
    {"name": "Nadia Siddiqui", "roll_number": "CS-21-007", "email": "nadia.siddiqui@uni.edu",  "department": "Computer Science",        "semester": 7},
    {"name": "Zubair Shah",     "roll_number": "CS-21-008", "email": "zubair.shah@uni.edu",     "department": "Computer Science",        "semester": 7},
    {"name": "Mariam Akhtar",   "roll_number": "CS-21-009", "email": "mariam.akhtar@uni.edu",   "department": "Computer Science",        "semester": 7},
    {"name": "Kamran Iqbal",    "roll_number": "CS-21-010", "email": "kamran.iqbal@uni.edu",    "department": "Computer Science",        "semester": 7},
    # Computer Science — Semester 5
    {"name": "Fatima Malik",    "roll_number": "CS-22-001", "email": "fatima.malik@uni.edu",    "department": "Computer Science",        "semester": 5},
    {"name": "Omar Farooq",     "roll_number": "CS-22-002", "email": "omar.farooq@uni.edu",     "department": "Computer Science",        "semester": 5},
    {"name": "Zain Hussain",    "roll_number": "CS-22-003", "email": "zain.hussain@uni.edu",    "department": "Computer Science",        "semester": 5},
    {"name": "Kiran Baig",      "roll_number": "CS-22-004", "email": "kiran.baig@uni.edu",      "department": "Computer Science",        "semester": 5},
    {"name": "Tariq Mehmood",   "roll_number": "CS-22-005", "email": "tariq.mehmood@uni.edu",   "department": "Computer Science",        "semester": 5},
    # Computer Science — Semester 3
    {"name": "Adeel Ahmad",     "roll_number": "CS-23-001", "email": "adeel.ahmad@uni.edu",     "department": "Computer Science",        "semester": 3},
    {"name": "Sana Mir",        "roll_number": "CS-23-002", "email": "sana.mir@uni.edu",        "department": "Computer Science",        "semester": 3},
    {"name": "Hamid Khan",      "roll_number": "CS-23-003", "email": "hamid.khan@uni.edu",      "department": "Computer Science",        "semester": 3},
    {"name": "Lubna Yousaf",    "roll_number": "CS-23-004", "email": "lubna.yousaf@uni.edu",    "department": "Computer Science",        "semester": 3},
    {"name": "Faisal Raza",     "roll_number": "CS-23-005", "email": "faisal.raza@uni.edu",     "department": "Computer Science",        "semester": 3},
    # Electrical Engineering — Semester 7
    {"name": "Rashid Mehmood",  "roll_number": "EE-21-001", "email": "rashid.mehmood@uni.edu",  "department": "Electrical Engineering",  "semester": 7},
    {"name": "Asad Ali",        "roll_number": "EE-21-002", "email": "asad.ali@uni.edu",        "department": "Electrical Engineering",  "semester": 7},
    {"name": "Noor Fatima",     "roll_number": "EE-21-003", "email": "noor.fatima@uni.edu",     "department": "Electrical Engineering",  "semester": 7},
    {"name": "Irfan Yusuf",     "roll_number": "EE-21-004", "email": "irfan.yusuf@uni.edu",     "department": "Electrical Engineering",  "semester": 7},
    {"name": "Shahid Hussain",  "roll_number": "EE-21-005", "email": "shahid.hussain@uni.edu",  "department": "Electrical Engineering",  "semester": 7},
    # Electrical Engineering — Semester 5
    {"name": "Rukhsana Bibi",   "roll_number": "EE-22-001", "email": "rukhsana.bibi@uni.edu",   "department": "Electrical Engineering",  "semester": 5},
    {"name": "Tanveer Abbas",   "roll_number": "EE-22-002", "email": "tanveer.abbas@uni.edu",   "department": "Electrical Engineering",  "semester": 5},
    {"name": "Ghazala Naz",     "roll_number": "EE-22-003", "email": "ghazala.naz@uni.edu",     "department": "Electrical Engineering",  "semester": 5},
    {"name": "Waqar Zafar",     "roll_number": "EE-22-004", "email": "waqar.zafar@uni.edu",     "department": "Electrical Engineering",  "semester": 5},
    {"name": "Huma Zaheer",     "roll_number": "EE-22-005", "email": "huma.zaheer@uni.edu",     "department": "Electrical Engineering",  "semester": 5},
    # Mechanical Engineering — Semester 7
    {"name": "Tariq Baig",      "roll_number": "ME-21-001", "email": "tariq.baig@uni.edu",      "department": "Mechanical Engineering",  "semester": 7},
    {"name": "Usman Ghani",     "roll_number": "ME-21-002", "email": "usman.ghani@uni.edu",     "department": "Mechanical Engineering",  "semester": 7},
    {"name": "Amna Rauf",       "roll_number": "ME-21-003", "email": "amna.rauf@uni.edu",       "department": "Mechanical Engineering",  "semester": 7},
    {"name": "Khalid Javed",    "roll_number": "ME-21-004", "email": "khalid.javed@uni.edu",    "department": "Mechanical Engineering",  "semester": 7},
    {"name": "Sidra Tariq",     "roll_number": "ME-21-005", "email": "sidra.tariq@uni.edu",     "department": "Mechanical Engineering",  "semester": 7},
    # Mechanical Engineering — Semester 5
    {"name": "Naeem Butt",      "roll_number": "ME-22-001", "email": "naeem.butt@uni.edu",      "department": "Mechanical Engineering",  "semester": 5},
    {"name": "Zahida Parveen",  "roll_number": "ME-22-002", "email": "zahida.parveen@uni.edu",  "department": "Mechanical Engineering",  "semester": 5},
    {"name": "Saeed Anwar",     "roll_number": "ME-22-003", "email": "saeed.anwar@uni.edu",     "department": "Mechanical Engineering",  "semester": 5},
    {"name": "Rabia Iqbal",     "roll_number": "ME-22-004", "email": "rabia.iqbal@uni.edu",     "department": "Mechanical Engineering",  "semester": 5},
    {"name": "Mohsin Khan",     "roll_number": "ME-22-005", "email": "mohsin.khan@uni.edu",     "department": "Mechanical Engineering",  "semester": 5},
    # Civil Engineering — Semester 7
    {"name": "Imran Yusuf",     "roll_number": "CE-21-001", "email": "imran.yusuf@uni.edu",     "department": "Civil Engineering",       "semester": 7},
    {"name": "Sobia Nasir",     "roll_number": "CE-21-002", "email": "sobia.nasir@uni.edu",     "department": "Civil Engineering",       "semester": 7},
    {"name": "Arif Memon",      "roll_number": "CE-21-003", "email": "arif.memon@uni.edu",      "department": "Civil Engineering",       "semester": 7},
    # Civil Engineering — Semester 5
    {"name": "Farhana Kausar",  "roll_number": "CE-22-001", "email": "farhana.kausar@uni.edu",  "department": "Civil Engineering",       "semester": 5},
    {"name": "Javed Akhtar",    "roll_number": "CE-22-002", "email": "javed.akhtar@uni.edu",    "department": "Civil Engineering",       "semester": 5},
    # Semester 1 — All departments
    {"name": "Haris Nawaz",     "roll_number": "CS-24-001", "email": "haris.nawaz@uni.edu",     "department": "Computer Science",        "semester": 1},
    {"name": "Ammara Shahzad",  "roll_number": "CS-24-002", "email": "ammara.shahzad@uni.edu",  "department": "Computer Science",        "semester": 1},
    {"name": "Danish Rao",      "roll_number": "EE-24-001", "email": "danish.rao@uni.edu",      "department": "Electrical Engineering",  "semester": 1},
    {"name": "Mahrukh Niaz",    "roll_number": "ME-24-001", "email": "mahrukh.niaz@uni.edu",    "department": "Mechanical Engineering",  "semester": 1},
    {"name": "Zohaib Sheikh",   "roll_number": "CE-24-001", "email": "zohaib.sheikh@uni.edu",   "department": "Civil Engineering",       "semester": 1},
]

# ─────────────────────────────────────────────────────────────────────────────
# 20 Sample Subjects
# ─────────────────────────────────────────────────────────────────────────────
SUBJECTS = [
    # CS — Semester 7
    {"subject_code": "CS-401", "subject_name": "Artificial Intelligence",          "department": "Computer Science",       "semester": 7, "exam_duration": 180, "enrolled_students": 85, "credits": 3, "instructor": "Dr. Asad Ali"},
    {"subject_code": "CS-403", "subject_name": "Database Systems",                 "department": "Computer Science",       "semester": 7, "exam_duration": 120, "enrolled_students": 92, "credits": 3, "instructor": "Dr. Faisal Raza"},
    {"subject_code": "CS-405", "subject_name": "Software Engineering",             "department": "Computer Science",       "semester": 7, "exam_duration": 120, "enrolled_students": 78, "credits": 3, "instructor": "Dr. Sana Mir"},
    {"subject_code": "CS-407", "subject_name": "Computer Networks",                "department": "Computer Science",       "semester": 7, "exam_duration": 120, "enrolled_students": 88, "credits": 3, "instructor": "Dr. Shahid Hussain"},
    {"subject_code": "CS-409", "subject_name": "Machine Learning",                 "department": "Computer Science",       "semester": 7, "exam_duration": 180, "enrolled_students": 72, "credits": 3, "instructor": "Dr. Hamid Khan"},
    # CS — Semester 5
    {"subject_code": "CS-301", "subject_name": "Data Structures & Algorithms",     "department": "Computer Science",       "semester": 5, "exam_duration": 180, "enrolled_students": 110,"credits": 4, "instructor": "Dr. Hamid Khan"},
    {"subject_code": "CS-303", "subject_name": "Operating Systems",                "department": "Computer Science",       "semester": 5, "exam_duration": 120, "enrolled_students": 95, "credits": 3, "instructor": "Dr. Noor Fatima"},
    {"subject_code": "CS-305", "subject_name": "Theory of Computation",            "department": "Computer Science",       "semester": 5, "exam_duration": 120, "enrolled_students": 80, "credits": 3, "instructor": "Dr. Mariam Akhtar"},
    # CS — Semester 3
    {"subject_code": "CS-201", "subject_name": "Object Oriented Programming",      "department": "Computer Science",       "semester": 3, "exam_duration": 120, "enrolled_students": 120,"credits": 3, "instructor": "Dr. Mariam Akhtar"},
    {"subject_code": "CS-203", "subject_name": "Discrete Mathematics",             "department": "Computer Science",       "semester": 3, "exam_duration": 120, "enrolled_students": 115,"credits": 3, "instructor": "Dr. Adeel Ahmad"},
    # CS — Semester 1
    {"subject_code": "CS-101", "subject_name": "Introduction to Programming",      "department": "Computer Science",       "semester": 1, "exam_duration": 120, "enrolled_students": 145,"credits": 3, "instructor": "Dr. Adeel Ahmad"},
    # EE — Semester 7
    {"subject_code": "EE-401", "subject_name": "Power Systems",                    "department": "Electrical Engineering", "semester": 7, "exam_duration": 120, "enrolled_students": 65, "credits": 3, "instructor": "Dr. Rashid Mehmood"},
    {"subject_code": "EE-403", "subject_name": "Control Systems",                  "department": "Electrical Engineering", "semester": 7, "exam_duration": 180, "enrolled_students": 70, "credits": 4, "instructor": "Dr. Zubair Shah"},
    {"subject_code": "EE-405", "subject_name": "Digital Signal Processing",        "department": "Electrical Engineering", "semester": 7, "exam_duration": 120, "enrolled_students": 60, "credits": 3, "instructor": "Dr. Irfan Yusuf"},
    # EE — Semester 5
    {"subject_code": "EE-301", "subject_name": "Electromagnetic Theory",           "department": "Electrical Engineering", "semester": 5, "exam_duration": 120, "enrolled_students": 55, "credits": 3, "instructor": "Dr. Noor Fatima"},
    # ME — Semester 7
    {"subject_code": "ME-401", "subject_name": "Thermodynamics",                   "department": "Mechanical Engineering", "semester": 7, "exam_duration": 120, "enrolled_students": 55, "credits": 3, "instructor": "Dr. Tariq Baig"},
    {"subject_code": "ME-403", "subject_name": "Fluid Mechanics",                  "department": "Mechanical Engineering", "semester": 7, "exam_duration": 120, "enrolled_students": 50, "credits": 3, "instructor": "Dr. Usman Ghani"},
    # ME — Semester 5
    {"subject_code": "ME-301", "subject_name": "Strength of Materials",            "department": "Mechanical Engineering", "semester": 5, "exam_duration": 120, "enrolled_students": 48, "credits": 3, "instructor": "Dr. Khalid Javed"},
    # CE — Semester 7
    {"subject_code": "CE-401", "subject_name": "Structural Analysis",              "department": "Civil Engineering",      "semester": 7, "exam_duration": 180, "enrolled_students": 48, "credits": 4, "instructor": "Dr. Imran Yusuf"},
    # CE — Semester 5
    {"subject_code": "CE-301", "subject_name": "Geotechnical Engineering",         "department": "Civil Engineering",      "semester": 5, "exam_duration": 120, "enrolled_students": 42, "credits": 3, "instructor": "Dr. Arif Memon"},
]

# ─────────────────────────────────────────────────────────────────────────────
# 8 Sample Classrooms
# ─────────────────────────────────────────────────────────────────────────────
CLASSROOMS = [
    {"room_number": "HALL-A",  "building": "Main Block",   "capacity": 200, "availability": True,  "room_type": "Exam Hall",    "facilities": "AC,CCTV,Projector,Sound System"},
    {"room_number": "HALL-B",  "building": "Main Block",   "capacity": 150, "availability": True,  "room_type": "Exam Hall",    "facilities": "AC,CCTV,Whiteboard"},
    {"room_number": "HALL-C",  "building": "Main Block",   "capacity": 100, "availability": False, "room_type": "Exam Hall",    "facilities": "AC,CCTV,Whiteboard"},
    {"room_number": "CS-101",  "building": "CS Block",     "capacity": 60,  "availability": True,  "room_type": "Classroom",    "facilities": "AC,Projector,Whiteboard"},
    {"room_number": "CS-102",  "building": "CS Block",     "capacity": 60,  "availability": True,  "room_type": "Classroom",    "facilities": "AC,Projector"},
    {"room_number": "EE-201",  "building": "EE Block",     "capacity": 50,  "availability": True,  "room_type": "Classroom",    "facilities": "AC,Whiteboard"},
    {"room_number": "CS-LAB1", "building": "CS Block",     "capacity": 40,  "availability": True,  "room_type": "Computer Lab", "facilities": "AC,PCs,Projector,Internet"},
    {"room_number": "SEMINAR", "building": "Admin Block",  "capacity": 80,  "availability": True,  "room_type": "Seminar Hall", "facilities": "AC,CCTV,Sound System,Projector"},
]

# ─────────────────────────────────────────────────────────────────────────────
# Default Exam Configuration
# ─────────────────────────────────────────────────────────────────────────────
DEFAULT_CONFIG = {
    "session_name":   "Fall 2024",
    "start_date":     "2024-12-01",
    "end_date":       "2024-12-15",
    "start_time":     "08:00",
    "end_time":       "18:00",
    "slot_duration":  120,
    "break_duration": 30,
}


# ─────────────────────────────────────────────────────────────────────────────
# Loader function
# ─────────────────────────────────────────────────────────────────────────────
def load_sample_data(db: Session) -> dict:
    """
    Inserts the sample dataset, skipping rows that already exist
    (idempotent — safe to call multiple times).

    Returns the TOTAL number of records that exist in the DB after the call,
    so the response always reflects the real database state regardless of
    whether this is the first or a repeated call.
    """
    # ── Students ─────────────────────────────────────────────────────────────
    for data in STUDENTS:
        exists = db.query(Student).filter(
            Student.roll_number == data["roll_number"]
        ).first()
        if not exists:
            db.add(Student(**data))

    # ── Subjects ─────────────────────────────────────────────────────────────
    for data in SUBJECTS:
        exists = db.query(Subject).filter(
            Subject.subject_code == data["subject_code"]
        ).first()
        if not exists:
            db.add(Subject(**data))

    # ── Classrooms ───────────────────────────────────────────────────────────
    for data in CLASSROOMS:
        exists = db.query(Classroom).filter(
            Classroom.room_number == data["room_number"]
        ).first()
        if not exists:
            db.add(Classroom(**data))

    # ── Default Exam Configuration (insert once) ──────────────────────────
    if db.query(ExamConfiguration).count() == 0:
        db.add(ExamConfiguration(**DEFAULT_CONFIG))

    # Flush everything to the database in one transaction
    db.commit()

    # ── Return ACTUAL totals from the DB (not just the inserted-this-call count)
    return {
        "students":   db.query(Student).count(),
        "subjects":   db.query(Subject).count(),
        "classrooms": db.query(Classroom).count(),
        "config":     db.query(ExamConfiguration).count(),
    }


def clear_all_data(db: Session) -> None:
    """Wipe all user data (keeps table structure intact)."""
    from app.models.models import Timetable, ExamConstraint
    db.query(ExamConstraint).delete()
    db.query(Timetable).delete()
    db.query(Student).delete()
    db.query(Subject).delete()
    db.query(Classroom).delete()
    db.query(ExamConfiguration).delete()
    db.commit()
