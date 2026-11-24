import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area,
} from 'recharts'
import {
  examDistributionData, roomUtilizationData, departmentData,
  weeklyScheduleData, subjects, classrooms, timetableEntries,
} from '../data/sampleData'
import { TrendingUp, Award, Users, Clock } from 'lucide-react'

const COLORS = ['#4f46e5','#06b6d4','#10b981','#f59e0b','#ec4899']

export default function AnalyticsPage() {
  const avgStudents = Math.round(timetableEntries.reduce((a,e)=>a+e.students,0)/timetableEntries.length)
  const utilised    = classrooms.filter(c=>c.available).length
  const deptCounts  = subjects.reduce((acc,s)=>{ acc[s.department]=(acc[s.department]||0)+1; return acc },{})

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Avg Students/Exam',   value: avgStudents,                        icon: Users,       color: 'bg-indigo-600' },
          { label: 'Schedule Efficiency', value: '94%',                              icon: TrendingUp,  color: 'bg-emerald-600' },
          { label: 'Rooms Utilised',      value: `${utilised}/${classrooms.length}`, icon: Award,       color: 'bg-cyan-600' },
          { label: 'Avg Exam Duration',   value: `${Math.round(subjects.reduce((a,s)=>a+s.duration,0)/subjects.length)}m`, icon: Clock, color: 'bg-violet-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
              <Icon size={18} className="text-white"/>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Weekly Schedule Progress</h3>
          <p className="text-xs text-slate-500 mb-4">Scheduled vs pending vs conflicts per week</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyScheduleData}>
              <defs>
                <linearGradient id="gScheduled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="week" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius:8, border:'none', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}/>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11 }}/>
              <Area type="monotone" dataKey="scheduled" name="Scheduled" stroke="#4f46e5" fill="url(#gScheduled)" strokeWidth={2}/>
              <Line type="monotone" dataKey="pending"   name="Pending"   stroke="#f59e0b" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="conflicts" name="Conflicts" stroke="#ef4444" strokeWidth={2} dot={false}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Student Load by Subject</h3>
          <p className="text-xs text-slate-500 mb-4">Number of enrolled students per exam</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={subjects.slice(0,8).map(s=>({ name:s.code, students:s.students }))} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false}/>
              <XAxis type="number" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
              <YAxis dataKey="name" type="category" tick={{ fontSize:10, fill:'#94a3b8' }} axisLine={false} tickLine={false} width={55}/>
              <Tooltip contentStyle={{ borderRadius:8, border:'none', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}/>
              <Bar dataKey="students" fill="#4f46e5" radius={[0,4,4,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Department Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Exams per academic department</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={departmentData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                {departmentData.map((entry,i) => <Cell key={i} fill={entry.color}/>)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius:8, border:'none', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}/>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11 }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-slate-800 mb-1">Room Capacity Utilization</h3>
          <p className="text-xs text-slate-500 mb-4">Assigned student count vs room capacity</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={roomUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="name" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{ borderRadius:8, border:'none', boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}/>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:11 }}/>
              <Bar dataKey="utilization" name="Utilization %" fill="#4f46e5" radius={[6,6,0,0]}/>
              <Bar dataKey="capacity"    name="Total Capacity" fill="#e0e7ff" radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top stats table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Subject Performance Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Rank','Code','Subject','Dept','Students','Duration','Instructor'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[...subjects].sort((a,b)=>b.students-a.students).map((s,i)=>(
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white ${i===0?'bg-amber-500':i===1?'bg-slate-400':i===2?'bg-orange-700':'bg-slate-200 text-slate-500'}`}>
                      {i+1}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-700 font-semibold">{s.code}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                  <td className="px-4 py-3 text-slate-600">{s.department}</td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{s.students}</td>
                  <td className="px-4 py-3 text-slate-600">{s.duration}m</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{s.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
