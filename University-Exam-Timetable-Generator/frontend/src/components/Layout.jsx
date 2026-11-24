import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const pageTitles = {
  '/':                 'Dashboard',
  '/students':         'Students',
  '/subjects':         'Subjects',
  '/classrooms':       'Classrooms',
  '/exam-config':      'Exam Configuration',
  '/generate':         'Generate Timetable',
  '/timetable':        'View Timetable',
  '/conflicts':        'Conflict Detection',
  '/ai-visualization': 'AI Algorithm Visualization',
  '/analytics':        'Analytics',
  '/settings':         'Settings',
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const title = pageTitles[pathname] ?? 'University Exam Scheduler'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main area – pushed right by sidebar width */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        <Header pageTitle={title} />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
        <footer className="text-center text-xs text-slate-400 py-3 border-t border-slate-200">
          © 2024 National University of Technology — Exam Timetable Generator v1.0
        </footer>
      </div>
    </div>
  )
}
