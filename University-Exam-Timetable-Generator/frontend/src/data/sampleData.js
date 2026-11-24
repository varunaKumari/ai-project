// ============================================================
// SAMPLE DATA — used throughout the entire frontend (Phase 2)
// Replace with real API calls in Phase 3
// ============================================================

// ── Students ────────────────────────────────────────────────
export const students = [
  { id: 1, name: 'Aisha Rahman',    regNo: 'CS-2021-001', department: 'Computer Science',    semester: 7, email: 'aisha.rahman@uni.edu',    status: 'active' },
  { id: 2, name: 'Bilal Ahmed',     regNo: 'EE-2021-045', department: 'Electrical Engineering', semester: 7, email: 'bilal.ahmed@uni.edu',     status: 'active' },
  { id: 3, name: 'Sara Khan',       regNo: 'CS-2022-012', department: 'Computer Science',    semester: 5, email: 'sara.khan@uni.edu',       status: 'active' },
  { id: 4, name: 'Omar Farooq',     regNo: 'ME-2020-089', department: 'Mechanical Engineering', semester: 9, email: 'omar.farooq@uni.edu',     status: 'inactive' },
  { id: 5, name: 'Fatima Malik',    regNo: 'CS-2023-033', department: 'Computer Science',    semester: 3, email: 'fatima.malik@uni.edu',    status: 'active' },
  { id: 6, name: 'Zain Hussain',    regNo: 'EE-2022-071', department: 'Electrical Engineering', semester: 5, email: 'zain.hussain@uni.edu',    status: 'active' },
  { id: 7, name: 'Hina Qureshi',    regNo: 'CS-2021-056', department: 'Computer Science',    semester: 7, email: 'hina.qureshi@uni.edu',    status: 'active' },
  { id: 8, name: 'Tariq Mehmood',   regNo: 'CE-2020-022', department: 'Civil Engineering',   semester: 9, email: 'tariq.mehmood@uni.edu',   status: 'active' },
  { id: 9, name: 'Nadia Siddiqui',  regNo: 'CS-2023-009', department: 'Computer Science',    semester: 3, email: 'nadia.siddiqui@uni.edu',  status: 'active' },
  { id: 10,name: 'Usman Ghani',     regNo: 'ME-2022-041', department: 'Mechanical Engineering', semester: 5, email: 'usman.ghani@uni.edu',     status: 'inactive' },
  { id: 11,name: 'Ayesha Nawaz',    regNo: 'CS-2021-078', department: 'Computer Science',    semester: 7, email: 'ayesha.nawaz@uni.edu',    status: 'active' },
  { id: 12,name: 'Kamran Iqbal',    regNo: 'EE-2023-055', department: 'Electrical Engineering', semester: 3, email: 'kamran.iqbal@uni.edu',    status: 'active' },
]

// ── Subjects ─────────────────────────────────────────────────
export const subjects = [
  { id: 1,  code: 'CS-401',  name: 'Artificial Intelligence',         department: 'CS',  credits: 3, semester: 7, students: 85, duration: 180, instructor: 'Dr. Asad Ali' },
  { id: 2,  code: 'CS-403',  name: 'Database Systems',                department: 'CS',  credits: 3, semester: 7, students: 92, duration: 120, instructor: 'Dr. Faisal Raza' },
  { id: 3,  code: 'CS-405',  name: 'Software Engineering',            department: 'CS',  credits: 3, semester: 7, students: 78, duration: 120, instructor: 'Dr. Sana Mir' },
  { id: 4,  code: 'CS-301',  name: 'Data Structures & Algorithms',    department: 'CS',  credits: 4, semester: 5, students: 110,duration: 180, instructor: 'Dr. Hamid Khan' },
  { id: 5,  code: 'CS-303',  name: 'Operating Systems',               department: 'CS',  credits: 3, semester: 5, students: 95, duration: 120, instructor: 'Dr. Noor Fatima' },
  { id: 6,  code: 'EE-401',  name: 'Power Systems',                   department: 'EE',  credits: 3, semester: 7, students: 65, duration: 120, instructor: 'Dr. Rashid Mehmood' },
  { id: 7,  code: 'EE-403',  name: 'Control Systems',                 department: 'EE',  credits: 4, semester: 7, students: 70, duration: 180, instructor: 'Dr. Zubair Shah' },
  { id: 8,  code: 'ME-401',  name: 'Thermodynamics',                  department: 'ME',  credits: 3, semester: 7, students: 55, duration: 120, instructor: 'Dr. Tariq Baig' },
  { id: 9,  code: 'CE-301',  name: 'Structural Analysis',             department: 'CE',  credits: 4, semester: 5, students: 48, duration: 180, instructor: 'Dr. Imran Yusuf' },
  { id: 10, code: 'CS-101',  name: 'Introduction to Programming',     department: 'CS',  credits: 3, semester: 1, students: 145,duration: 120, instructor: 'Dr. Adeel Ahmad' },
  { id: 11, code: 'CS-201',  name: 'Object Oriented Programming',     department: 'CS',  credits: 3, semester: 3, students: 120,duration: 120, instructor: 'Dr. Mariam Akhtar' },
  { id: 12, code: 'CS-407',  name: 'Computer Networks',               department: 'CS',  credits: 3, semester: 7, students: 88, duration: 120, instructor: 'Dr. Shahid Hussain' },
]

// ── Classrooms ───────────────────────────────────────────────
export const classrooms = [
  { id: 1,  name: 'Hall A',      building: 'Main Block',   capacity: 200, type: 'Exam Hall',   available: true,  facilities: ['AC', 'CCTV', 'Projector'] },
  { id: 2,  name: 'Hall B',      building: 'Main Block',   capacity: 150, type: 'Exam Hall',   available: true,  facilities: ['AC', 'CCTV'] },
  { id: 3,  name: 'Hall C',      building: 'Main Block',   capacity: 100, type: 'Exam Hall',   available: false, facilities: ['AC', 'CCTV', 'Whiteboard'] },
  { id: 4,  name: 'Room 101',    building: 'CS Block',     capacity: 60,  type: 'Classroom',   available: true,  facilities: ['AC', 'Projector'] },
  { id: 5,  name: 'Room 102',    building: 'CS Block',     capacity: 60,  type: 'Classroom',   available: true,  facilities: ['AC', 'Projector'] },
  { id: 6,  name: 'Room 201',    building: 'EE Block',     capacity: 50,  type: 'Classroom',   available: true,  facilities: ['AC', 'Whiteboard'] },
  { id: 7,  name: 'Lab 1',       building: 'CS Block',     capacity: 40,  type: 'Computer Lab', available: true,  facilities: ['AC', 'PCs', 'Projector'] },
  { id: 8,  name: 'Lab 2',       building: 'CS Block',     capacity: 40,  type: 'Computer Lab', available: false, facilities: ['AC', 'PCs'] },
  { id: 9,  name: 'Seminar Hall',building: 'Admin Block',  capacity: 80,  type: 'Seminar Hall', available: true,  facilities: ['AC', 'CCTV', 'Sound System'] },
  { id: 10, name: 'Room 301',    building: 'ME Block',     capacity: 55,  type: 'Classroom',   available: true,  facilities: ['Fan', 'Whiteboard'] },
]

// ── Time Slots ───────────────────────────────────────────────
export const timeSlots = [
  { id: 1, day: 'Monday',    start: '08:00', end: '10:00', available: true  },
  { id: 2, day: 'Monday',    start: '10:30', end: '12:30', available: true  },
  { id: 3, day: 'Monday',    start: '14:00', end: '16:00', available: true  },
  { id: 4, day: 'Tuesday',   start: '08:00', end: '10:00', available: true  },
  { id: 5, day: 'Tuesday',   start: '10:30', end: '12:30', available: false },
  { id: 6, day: 'Tuesday',   start: '14:00', end: '16:00', available: true  },
  { id: 7, day: 'Wednesday', start: '08:00', end: '10:00', available: true  },
  { id: 8, day: 'Wednesday', start: '10:30', end: '12:30', available: true  },
  { id: 9, day: 'Thursday',  start: '08:00', end: '10:00', available: true  },
  { id: 10,day: 'Thursday',  start: '10:30', end: '12:30', available: true  },
  { id: 11,day: 'Friday',    start: '08:00', end: '10:00', available: true  },
  { id: 12,day: 'Friday',    start: '10:30', end: '12:30', available: false },
]

// ── Timetable ────────────────────────────────────────────────
export const timetableEntries = [
  { id: 1,  subject: 'Artificial Intelligence',      code: 'CS-401', room: 'Hall A',   day: 'Monday',    start: '08:00', end: '10:00', students: 85,  instructor: 'Dr. Asad Ali',       status: 'confirmed' },
  { id: 2,  subject: 'Database Systems',             code: 'CS-403', room: 'Hall B',   day: 'Monday',    start: '10:30', end: '12:30', students: 92,  instructor: 'Dr. Faisal Raza',    status: 'confirmed' },
  { id: 3,  subject: 'Software Engineering',         code: 'CS-405', room: 'Room 101', day: 'Tuesday',   start: '08:00', end: '10:00', students: 78,  instructor: 'Dr. Sana Mir',       status: 'confirmed' },
  { id: 4,  subject: 'Data Structures & Algorithms', code: 'CS-301', room: 'Hall A',   day: 'Tuesday',   start: '14:00', end: '17:00', students: 110, instructor: 'Dr. Hamid Khan',     status: 'confirmed' },
  { id: 5,  subject: 'Operating Systems',            code: 'CS-303', room: 'Hall B',   day: 'Wednesday', start: '08:00', end: '10:00', students: 95,  instructor: 'Dr. Noor Fatima',    status: 'confirmed' },
  { id: 6,  subject: 'Power Systems',                code: 'EE-401', room: 'Room 201', day: 'Wednesday', start: '10:30', end: '12:30', students: 65,  instructor: 'Dr. Rashid Mehmood', status: 'confirmed' },
  { id: 7,  subject: 'Control Systems',              code: 'EE-403', room: 'Hall C',   day: 'Thursday',  start: '08:00', end: '11:00', students: 70,  instructor: 'Dr. Zubair Shah',    status: 'pending'   },
  { id: 8,  subject: 'Thermodynamics',               code: 'ME-401', room: 'Room 301', day: 'Thursday',  start: '10:30', end: '12:30', students: 55,  instructor: 'Dr. Tariq Baig',     status: 'confirmed' },
  { id: 9,  subject: 'Structural Analysis',          code: 'CE-301', room: 'Hall A',   day: 'Friday',    start: '08:00', end: '11:00', students: 48,  instructor: 'Dr. Imran Yusuf',    status: 'confirmed' },
  { id: 10, subject: 'Computer Networks',            code: 'CS-407', room: 'Hall B',   day: 'Friday',    start: '10:30', end: '12:30', students: 88,  instructor: 'Dr. Shahid Hussain', status: 'pending'   },
]

// ── Conflicts ────────────────────────────────────────────────
export const conflicts = [
  { id: 1, type: 'Room Conflict',      severity: 'high',   description: 'Hall C is marked unavailable but assigned to Control Systems exam',   subject1: 'Control Systems', subject2: null, day: 'Thursday', time: '08:00–11:00', room: 'Hall C',   resolved: false },
  { id: 2, type: 'Capacity Violation', severity: 'medium', description: 'Database Systems (92 students) assigned to Hall B (capacity: 150) — OK but near limit', subject1: 'Database Systems', subject2: null, day: 'Monday', time: '10:30–12:30', room: 'Hall B', resolved: false },
  { id: 3, type: 'Instructor Clash',   severity: 'low',    description: 'Dr. Asad Ali has overlapping office hours during AI exam slot',        subject1: 'Artificial Intelligence', subject2: null, day: 'Monday', time: '08:00–10:00', room: 'Hall A', resolved: true  },
  { id: 4, type: 'Time Slot Conflict', severity: 'high',   description: 'Students enrolled in both CS-403 and EE-403 have overlapping exam times', subject1: 'Database Systems', subject2: 'Control Systems', day: 'Multiple', time: 'Various', room: 'Various', resolved: false },
]

// ── Analytics ────────────────────────────────────────────────
export const examDistributionData = [
  { name: 'Mon', exams: 2 },
  { name: 'Tue', exams: 2 },
  { name: 'Wed', exams: 2 },
  { name: 'Thu', exams: 2 },
  { name: 'Fri', exams: 2 },
]

export const roomUtilizationData = [
  { name: 'Hall A',       utilization: 90, capacity: 200 },
  { name: 'Hall B',       utilization: 75, capacity: 150 },
  { name: 'Hall C',       utilization: 0,  capacity: 100 },
  { name: 'Room 101',     utilization: 100,capacity: 60  },
  { name: 'Room 201',     utilization: 100,capacity: 50  },
  { name: 'Room 301',     utilization: 100,capacity: 55  },
]

export const departmentData = [
  { name: 'Computer Science',    value: 7, color: '#4f46e5' },
  { name: 'Electrical Eng.',     value: 2, color: '#06b6d4' },
  { name: 'Mechanical Eng.',     value: 1, color: '#10b981' },
  { name: 'Civil Engineering',   value: 1, color: '#f59e0b' },
]

export const weeklyScheduleData = [
  { week: 'Week 1', scheduled: 4, pending: 1, conflicts: 1 },
  { week: 'Week 2', scheduled: 6, pending: 2, conflicts: 0 },
  { week: 'Week 3', scheduled: 8, pending: 1, conflicts: 2 },
  { week: 'Week 4', scheduled: 10,pending: 0, conflicts: 1 },
]

// ── Recent Activity ──────────────────────────────────────────
export const recentActivity = [
  { id: 1, action: 'Timetable generated',       detail: 'CSP solver completed in 1.2s',          time: '2 min ago',   type: 'success' },
  { id: 2, action: 'Conflict detected',         detail: 'Room clash in Hall C on Thursday',       time: '5 min ago',   type: 'warning' },
  { id: 3, action: 'New subject added',         detail: 'Computer Networks (CS-407) added',       time: '1 hour ago',  type: 'info'    },
  { id: 4, action: 'Room marked unavailable',   detail: 'Hall C under maintenance',               time: '2 hours ago', type: 'warning' },
  { id: 5, action: 'Exam schedule confirmed',   detail: 'AI, DB, OS exams confirmed',             time: '3 hours ago', type: 'success' },
  { id: 6, action: 'Student list updated',      detail: 'CS-401 enrollment: 85 students',         time: '5 hours ago', type: 'info'    },
]

// ── CSP Steps (AI Visualisation) ─────────────────────────────
export const cspSteps = [
  { step: 1, action: 'Initialise',        variable: '—',       value: '—',          domainsLeft: 120, backtracks: 0, description: 'Loading all exams, rooms and time slots into CSP model' },
  { step: 2, action: 'MRV Select',        variable: 'CS-401',  value: '—',          domainsLeft: 108, backtracks: 0, description: 'MRV picks CS-401 (AI) — fewest 12 valid (room, slot) pairs' },
  { step: 3, action: 'LCV Order',         variable: 'CS-401',  value: 'Hall A / Mon 08:00', domainsLeft: 108, backtracks: 0, description: 'LCV selects Hall A / Mon 08:00 — least constraining for neighbours' },
  { step: 4, action: 'Forward Check',     variable: 'CS-401',  value: 'Hall A / Mon 08:00', domainsLeft: 97, backtracks: 0, description: 'Prune Hall A / Mon 08:00 from all other exams\' domains' },
  { step: 5, action: 'MRV Select',        variable: 'CS-403',  value: '—',          domainsLeft: 97,  backtracks: 0, description: 'Next: CS-403 (DB Systems) with 11 remaining values' },
  { step: 6, action: 'Assign',            variable: 'CS-403',  value: 'Hall B / Mon 10:30', domainsLeft: 86, backtracks: 0, description: 'Assign Hall B / Mon 10:30 — consistent, no conflicts' },
  { step: 7, action: 'MRV Select',        variable: 'EE-403',  value: '—',          domainsLeft: 86,  backtracks: 0, description: 'EE-403 (Control) has fewest remaining — Hall C conflict coming' },
  { step: 8, action: 'Conflict Detected', variable: 'EE-403',  value: 'Hall C / Thu 08:00', domainsLeft: 83, backtracks: 1, description: 'Hall C is unavailable — constraint violated, backtrack!' },
  { step: 9, action: 'Backtrack',         variable: 'EE-403',  value: '—',          domainsLeft: 80,  backtracks: 1, description: 'Backtrack and try next value from LCV-ordered domain' },
  { step: 10,action: 'Assign',            variable: 'EE-403',  value: 'Seminar / Thu 08:00', domainsLeft: 72, backtracks: 1, description: 'Assign Seminar Hall / Thu 08:00 — all constraints satisfied' },
  { step: 11,action: 'Complete',          variable: 'ALL',     value: 'Solution Found', domainsLeft: 0, backtracks: 1, description: 'All 10 exams scheduled. Solution found in 1.2 seconds with 1 backtrack.' },
]

// ── Settings ─────────────────────────────────────────────────
export const settings = {
  university: {
    name: 'National University of Technology',
    shortName: 'NUT',
    examSession: 'Fall 2024',
    startDate: '2024-12-01',
    endDate: '2024-12-15',
    timezone: 'Asia/Karachi',
  },
  algorithm: {
    useMRV: true,
    useDegree: true,
    useLCV: true,
    useForwardChecking: true,
    maxBacktracks: 1000,
    timeoutSeconds: 30,
  },
  notifications: {
    emailOnGenerate: true,
    emailOnConflict: true,
    emailOnComplete: false,
  },
}
