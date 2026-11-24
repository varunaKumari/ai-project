import { useState } from 'react'
import { Search, Plus, Edit, Trash2, BookOpen, Clock, Users } from 'lucide-react'
import { subjects } from '../data/sampleData'

const deptColors = {
  CS: 'bg-indigo-100 text-indigo-700',
  EE: 'bg-cyan-100 text-cyan-700',
  ME: 'bg-amber-100 text-amber-700',
  CE: 'bg-emerald-100 text-emerald-700',
}

export default function SubjectsPage() {
  const [search, setSearch]   = useState('')
  const [deptFilter, setDept] = useState('All')
  const [view, setView]       = useState('table') // 'table' | 'cards'

  const depts = ['All', ...new Set(subjects.map(s => s.department))]

  const filtered = subjects.filter(s => {
    const q = search.toLowerCase()
    return (
      (deptFilter === 'All' || s.department === deptFilter) &&
      (s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.instructor.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Subjects',    value: subjects.length },
          { label: 'Total Students',    value: subjects.reduce((a,s)=>a+s.students,0) },
          { label: 'Avg Duration (min)',value: Math.round(subjects.reduce((a,s)=>a+s.duration,0)/subjects.length) },
          { label: 'Departments',       value: new Set(subjects.map(s=>s.department)).size },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search subjects, codes, instructors…" value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={deptFilter} onChange={e=>setDept(e.target.value)}>
            {depts.map(d=><option key={d}>{d}</option>)}
          </select>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            {['table','cards'].map(v=>(
              <button key={v} onClick={()=>setView(v)}
                className={`px-3 py-2 text-xs font-semibold capitalize ${view===v?'bg-indigo-600 text-white':'text-slate-600 hover:bg-slate-50'}`}>
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus size={15} /> Add Subject
          </button>
        </div>

        {view === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Code','Subject Name','Dept','Credits','Semester','Students','Duration','Instructor',''].map(h=>(
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(s=>(
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-indigo-700 font-semibold">{s.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${deptColors[s.department]??'bg-slate-100 text-slate-600'}`}>{s.department}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-center">{s.credits}</td>
                    <td className="px-4 py-3 text-slate-600 text-center">{s.semester}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-slate-600"><Users size={12}/>{s.students}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-slate-600"><Clock size={12}/>{s.duration}m</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{s.instructor}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><Edit size={14}/></button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(s=>(
              <div key={s.id} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-xs text-indigo-600 font-semibold">{s.code}</span>
                    <h4 className="font-semibold text-slate-800 mt-0.5">{s.name}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${deptColors[s.department]??''}`}>{s.department}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 mb-3">
                  <div className="bg-slate-50 rounded-lg p-2 text-center"><p className="font-bold text-slate-800">{s.credits}</p><p>Credits</p></div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center"><p className="font-bold text-slate-800">{s.students}</p><p>Students</p></div>
                  <div className="bg-slate-50 rounded-lg p-2 text-center"><p className="font-bold text-slate-800">{s.duration}m</p><p>Duration</p></div>
                </div>
                <p className="text-xs text-slate-500">👤 {s.instructor} · Sem {s.semester}</p>
              </div>
            ))}
          </div>
        )}
        <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
          Showing {filtered.length} of {subjects.length} subjects
        </div>
      </div>
    </div>
  )
}
