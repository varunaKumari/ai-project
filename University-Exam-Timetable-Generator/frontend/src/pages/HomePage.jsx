/**
 * Dashboard / Home page.
 * Displays summary stats and a live API health indicator.
 */

import { useEffect, useState } from 'react'
import { BookOpen, Building2, Clock, Calendar, Cpu, CheckCircle, XCircle } from 'lucide-react'
import { checkHealth, getExams, getRooms, getTimeslots } from '../api/client'
import StatCard from '../components/StatCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function HomePage() {
  const [stats, setStats] = useState({ exams: 0, rooms: 0, timeslots: 0 })
  const [apiStatus, setApiStatus] = useState('checking') // 'ok' | 'error' | 'checking'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [healthRes, examsRes, roomsRes, slotsRes] = await Promise.all([
          checkHealth(),
          getExams(),
          getRooms(),
          getTimeslots(),
        ])
        setApiStatus(healthRes.data.status === 'ok' ? 'ok' : 'error')
        setStats({
          exams: examsRes.data.length,
          rooms: roomsRes.data.length,
          timeslots: slotsRes.data.length,
        })
      } catch {
        setApiStatus('error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          University Exam Timetable Generator
        </h1>
        <p className="mt-2 text-slate-500 text-base max-w-2xl">
          AI-powered scheduling using{' '}
          <span className="font-semibold text-indigo-600">Constraint Satisfaction Problem (CSP)</span> with
          Backtracking Search, MRV, Degree Heuristic, LCV, and Forward Checking.
        </p>
      </div>

      {/* API health banner */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg border mb-8 text-sm font-medium ${
          apiStatus === 'ok'
            ? 'bg-green-50 border-green-200 text-green-700'
            : apiStatus === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-700'
            : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}
      >
        {apiStatus === 'ok' ? (
          <CheckCircle size={18} />
        ) : apiStatus === 'error' ? (
          <XCircle size={18} />
        ) : (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {apiStatus === 'ok'
          ? 'Backend API is online and healthy'
          : apiStatus === 'error'
          ? 'Cannot reach backend API — make sure the FastAPI server is running on port 8000'
          : 'Checking API status…'}
      </div>

      {/* Stats */}
      {loading ? (
        <LoadingSpinner message="Fetching dashboard data…" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard title="Exams" value={stats.exams} icon={BookOpen} color="indigo" />
          <StatCard title="Rooms" value={stats.rooms} icon={Building2} color="green" />
          <StatCard title="Time Slots" value={stats.timeslots} icon={Clock} color="amber" />
          <StatCard title="Scheduled" value={0} icon={Calendar} color="rose" />
        </div>
      )}

      {/* CSP Algorithm info cards */}
      <h2 className="text-xl font-bold text-slate-700 mb-4">AI Techniques Used</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {algorithmCards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={18} className="text-indigo-500" />
              <h3 className="font-semibold text-slate-700">{card.title}</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

const algorithmCards = [
  {
    title: 'Backtracking Search',
    description:
      'Systematically assigns values to variables and backtracks when a constraint is violated, exploring the solution space efficiently.',
  },
  {
    title: 'MRV Heuristic',
    description:
      'Minimum Remaining Values: always selects the exam with the fewest remaining legal (room, slot) assignments to fail early.',
  },
  {
    title: 'Degree Heuristic',
    description:
      'Tie-breaks MRV by choosing the exam involved in the most constraints with other unscheduled exams.',
  },
  {
    title: 'LCV Heuristic',
    description:
      'Least Constraining Value: orders domain values to prefer those that least restrict the remaining exams\' options.',
  },
  {
    title: 'Forward Checking',
    description:
      'After each assignment, removes inconsistent values from neighbouring exams\' domains and backtracks early if any domain becomes empty.',
  },
  {
    title: 'Constraint Propagation',
    description:
      'Enforces binary constraints (room capacity, no clashes) across the entire problem before and during search.',
  },
]
