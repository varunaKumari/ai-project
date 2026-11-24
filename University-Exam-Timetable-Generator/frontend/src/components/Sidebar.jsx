import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, BookOpen, Building2,
  Settings2, Zap, CalendarDays, AlertTriangle,
  BrainCircuit, BarChart3, Settings, GraduationCap,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',              path: '/',                icon: LayoutDashboard },
  { label: 'Students',               path: '/students',        icon: Users            },
  { label: 'Subjects',               path: '/subjects',        icon: BookOpen         },
  { label: 'Classrooms',             path: '/classrooms',      icon: Building2        },
  { label: 'Exam Configuration',     path: '/exam-config',     icon: Settings2        },
  { label: 'Generate Timetable',     path: '/generate',        icon: Zap              },
  { label: 'View Timetable',         path: '/timetable',       icon: CalendarDays     },
  { label: 'Conflict Detection',     path: '/conflicts',       icon: AlertTriangle    },
  { label: 'AI Visualization',       path: '/ai-visualization',icon: BrainCircuit     },
  { label: 'Analytics',              path: '/analytics',       icon: BarChart3        },
  { label: 'Settings',               path: '/settings',        icon: Settings         },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-700 shrink-0">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
          <GraduationCap size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm leading-tight text-white">Exam Scheduler</p>
            <p className="text-slate-400 text-xs">NUT Admin</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="px-2 pb-4 border-t border-slate-700 pt-3 shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-sm"
        >
          <ChevronRight size={16} className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
