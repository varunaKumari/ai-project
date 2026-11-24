import { useState } from 'react'
import { CalendarDays, Download, Filter, CheckCircle, Clock, Users, Building2 } from 'lucide-react'
import { timetableEntries } from '../data/sampleData'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']
const statusColors = {
  confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  pending:   'bg-amber-100 text-amber-700 border-amber-200',
}
const deptBg = {
  'CS':'bg-indigo-500', 'EE':'bg-cyan-500', 'ME':'bg-amber-500', 'CE':'bg-emerald-500',
}

export default function ViewTimetablePage() {
  const [view, setView] = useState('grid')   // 'grid' | 'table'
  const [dayFilter, setDayFilter] = useState('All')

  const filtered = timetableEntries.filter(e => dayFilter === 'All' || e.day === dayFilter)

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Scheduled',  value: timetableEntries.length,                               color: 'bg-indigo-600' },
          { label: 'Confirmed',        value: timetableEntries.filter(e=>e.status==='confirmed').length, color: 'bg-emerald-500' },
          { label: 'Pending',          value: timetableEntries.filter(e=>e.status==='pending').length,   color: 'bg-amber-500' },
          { label: 'Total Students',   value: timetableEntries.reduce((a,e)=>a+e.students,0),          color: 'bg-violet-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
              <CalendarDays size={18} className="text-white"/>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1">
          {['All',...days].map(d=>(
            <button key={d} onClick={()=>setDayFilter(d)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${dayFilter===d?'bg-indigo-600 text-white shadow':'text-slate-600 hover:bg-slate-100'}`}>
              {d==='All'?'All Days':d.slice(0,3)}
            </button>
          ))}
        </div>
        <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white ml-auto">
          {['grid','table'].map(v=>(
            <button key={v} onClick={()=>setView(v)}
              className={`px-3 py-2 text-xs font-semibold capitalize ${view===v?'bg-indigo-600 text-white':'text-slate-600 hover:bg-slate-50'}`}>
              {v}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors">
          <Download size={14}/> Export PDF
        </button>
      </div>

      {/* Grid view — calendar style */}
      {view === 'grid' ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 border-b border-slate-200">
            {days.map(d=>(
              <div key={d} className={`p-3 text-center text-xs font-bold uppercase tracking-widest ${dayFilter!=='All'&&dayFilter!==d?'opacity-30':''} ${d===dayFilter?'bg-indigo-50 text-indigo-700':'text-slate-500'}`}>
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-0 divide-x divide-slate-100 min-h-80">
            {days.map(day=>(
              <div key={day} className={`p-2 space-y-2 ${dayFilter!=='All'&&dayFilter!==day?'opacity-30 bg-slate-50':''}`}>
                {timetableEntries.filter(e=>e.day===day).map(entry=>{
                  const dept = entry.code.split('-')[0]
                  return (
                    <div key={entry.id} className={`${deptBg[dept]??'bg-slate-500'} rounded-lg p-2.5 text-white cursor-pointer hover:opacity-90 transition-opacity`}>
                      <p className="font-bold text-xs leading-tight">{entry.code}</p>
                      <p className="text-xs opacity-80 truncate">{entry.subject}</p>
                      <div className="flex items-center gap-1 mt-1.5 text-xs opacity-80">
                        <Clock size={10}/>{entry.start}–{entry.end}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5 text-xs opacity-80">
                        <Building2 size={10}/>{entry.room}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Code','Subject','Day','Time','Room','Students','Instructor','Status'].map(h=>(
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(e=>(
                  <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-indigo-700 font-semibold">{e.code}</td>
                    <td className="px-4 py-3 font-medium text-slate-800 max-w-40 truncate">{e.subject}</td>
                    <td className="px-4 py-3 text-slate-600">{e.day}</td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap text-xs">{e.start}–{e.end}</td>
                    <td className="px-4 py-3 text-slate-600">{e.room}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-slate-600"><Users size={12}/>{e.students}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">{e.instructor}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${statusColors[e.status]}`}>
                        {e.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-500">
            Showing {filtered.length} of {timetableEntries.length} entries
          </div>
        </div>
      )}
    </div>
  )
}
