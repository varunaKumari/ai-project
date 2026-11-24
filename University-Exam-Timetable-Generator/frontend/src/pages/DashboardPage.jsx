import {
  Users, BookOpen, Building2, CalendarDays,
  Clock, AlertTriangle, Zap, ArrowRight, TrendingUp,
  CheckCircle, XCircle, Activity,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from 'recharts'
import {
  examDistributionData, roomUtilizationData, departmentData,
  recentActivity, timetableEntries, conflicts,
  students, subjects, classrooms, timeSlots,
} from '../data/sampleData'
import { useNavigate } from 'react-router-dom'

const StatCard = ({ title, value, icon: Icon, color, sub }) => {
  const styles = {
    indigo: { bg: 'bg-indigo-50', icon: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-100' },
    cyan:   { bg: 'bg-cyan-50',   icon: 'bg-cyan-600',   text: 'text-cyan-600',   border: 'border-cyan-100'   },
    emerald:{ bg: 'bg-emerald-50',icon: 'bg-emerald-600',text: 'text-emerald-600',border: 'border-emerald-100'},
    amber:  { bg: 'bg-amber-50',  icon: 'bg-amber-600',  text: 'text-amber-600',  border: 'border-amber-100'  },
    violet: { bg: 'bg-violet-50', icon: 'bg-violet-600', text: 'text-violet-600', border: 'border-violet-100' },
    rose:   { bg: 'bg-rose-50',   icon: 'bg-rose-600',   text: 'text-rose-600',   border: 'border-rose-100'   },
  }
  const s = styles[color] ?? styles.indigo
  return (
    <div className={`bg-white rounded-xl border ${s.border} p-5 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
          {sub && <p className={`text-xs mt-1 ${s.text} font-medium`}>{sub}</p>}
        </div>
        <div className={`${s.icon} p-2.5 rounded-lg`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
    </div>
  )
}

const activityIcon = { success: CheckCircle, warning: AlertTriangle, info: Activity }
const activityColor = { success: 'text-emerald-500', warning: 'text-amber-500', info: 'text-indigo-500' }

export default function DashboardPage() {
  const navigate = useNavigate()
  const scheduledCount = timetableEntries.filter(e => e.status === 'confirmed').length
  const conflictCount  = conflicts.filter(c => !c.resolved).length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Students"   value={students.length}                       icon={Users}         color="indigo"  sub="+12 this semester" />
        <StatCard title="Total Subjects"   value={subjects.length}                       icon={BookOpen}      color="cyan"    sub="4 departments" />
        <StatCard title="Classrooms"       value={classrooms.length}                     icon={Building2}     color="emerald" sub={`${classrooms.filter(c=>c.available).length} available`} />
        <StatCard title="Scheduled Exams"  value={scheduledCount}                        icon={CalendarDays}  color="violet"  sub="2 pending" />
        <StatCard title="Time Slots"       value={timeSlots.filter(t=>t.available).length} icon={Clock}       color="amber"   sub="of 12 total" />
        <StatCard title="Conflicts"        value={conflictCount}                          icon={AlertTriangle} color="rose"    sub="needs attention" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam distribution by day */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Exam Distribution</h3>
              <p className="text-xs text-slate-500">Exams scheduled per day</p>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2.5 py-1 rounded-full">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={examDistributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="exams" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department distribution pie */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-800">By Department</h3>
            <p className="text-xs text-slate-500">Exam count per department</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {departmentData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Classroom utilisation + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Classroom utilisation */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Classroom Utilization</h3>
              <p className="text-xs text-slate-500">Percentage of capacity in use</p>
            </div>
          </div>
          <div className="space-y-3">
            {roomUtilizationData.map((room) => (
              <div key={room.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">{room.name}</span>
                  <span className={`font-semibold ${room.utilization >= 90 ? 'text-rose-500' : room.utilization === 0 ? 'text-slate-400' : 'text-indigo-600'}`}>
                    {room.utilization}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${room.utilization >= 90 ? 'bg-rose-500' : room.utilization === 0 ? 'bg-slate-300' : 'bg-indigo-500'}`}
                    style={{ width: `${room.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Recent Activity</h3>
            <button className="text-xs text-indigo-600 font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((item) => {
              const Icon = activityIcon[item.type]
              return (
                <div key={item.id} className="flex gap-3 items-start">
                  <Icon size={15} className={`mt-0.5 shrink-0 ${activityColor[item.type]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{item.action}</p>
                    <p className="text-xs text-slate-500 truncate">{item.detail}</p>
                    <p className="text-xs text-slate-400">{item.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick actions + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Generate Timetable', path: '/generate',    icon: Zap,          color: 'bg-indigo-600 hover:bg-indigo-700 text-white' },
              { label: 'View Timetable',     path: '/timetable',   icon: CalendarDays, color: 'bg-cyan-600 hover:bg-cyan-700 text-white' },
              { label: 'Detect Conflicts',   path: '/conflicts',   icon: AlertTriangle,color: 'bg-rose-600 hover:bg-rose-700 text-white' },
              { label: 'AI Visualization',  path: '/ai-visualization', icon: TrendingUp,color: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
            ].map(({ label, path, icon: Icon, color }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${color} shadow-sm`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Generation status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Timetable Generation Status</h3>
          <div className="space-y-3">
            {[
              { label: 'Exams loaded',         done: true  },
              { label: 'Rooms configured',      done: true  },
              { label: 'Time slots set',        done: true  },
              { label: 'CSP solver executed',   done: true  },
              { label: 'Conflicts resolved',    done: false },
              { label: 'Schedule published',    done: false },
            ].map(({ label, done }) => (
              <div key={label} className="flex items-center gap-3">
                {done
                  ? <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                  : <XCircle    size={16} className="text-slate-300 shrink-0" />}
                <span className={`text-sm ${done ? 'text-slate-700' : 'text-slate-400'}`}>{label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/generate')}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            <Zap size={15} /> Re-generate Timetable
          </button>
        </div>
      </div>
    </div>
  )
}
