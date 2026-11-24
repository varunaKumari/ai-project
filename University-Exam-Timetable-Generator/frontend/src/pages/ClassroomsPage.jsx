import { useState } from 'react'
import { Plus, Edit, Trash2, Building2, Users, CheckCircle, XCircle } from 'lucide-react'
import { classrooms } from '../data/sampleData'

const typeColors = {
  'Exam Hall':     'bg-indigo-100 text-indigo-700',
  'Classroom':     'bg-cyan-100 text-cyan-700',
  'Computer Lab':  'bg-violet-100 text-violet-700',
  'Seminar Hall':  'bg-amber-100 text-amber-700',
}

export default function ClassroomsPage() {
  const [filter, setFilter] = useState('All')
  const types = ['All', ...new Set(classrooms.map(c=>c.type))]
  const filtered = classrooms.filter(c => filter === 'All' || c.type === filter)

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Rooms',      value: classrooms.length,                                                color: 'bg-indigo-600' },
          { label: 'Available',        value: classrooms.filter(c=>c.available).length,                        color: 'bg-emerald-500' },
          { label: 'Unavailable',      value: classrooms.filter(c=>!c.available).length,                       color: 'bg-rose-500' },
          { label: 'Total Capacity',   value: classrooms.reduce((a,c)=>a+c.capacity,0),                        color: 'bg-cyan-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
              <Building2 size={18} className="text-white" />
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
          {types.map(t=>(
            <button key={t} onClick={()=>setFilter(t)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${filter===t?'bg-indigo-600 text-white shadow':'text-slate-600 hover:bg-slate-100'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus size={15}/> Add Room
          </button>
        </div>
      </div>

      {/* Grid cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(room=>(
          <div key={room.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-slate-800 text-base">{room.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{room.building}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[room.type]??'bg-slate-100 text-slate-600'}`}>{room.type}</span>
                <span className={`flex items-center gap-1 text-xs font-semibold ${room.available?'text-emerald-600':'text-rose-500'}`}>
                  {room.available ? <CheckCircle size={12}/> : <XCircle size={12}/>}
                  {room.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
              <Users size={14} className="text-slate-400"/>
              Capacity: <span className="text-indigo-600">{room.capacity} seats</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {room.facilities.map(f=>(
                <span key={f} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{f}</span>
              ))}
            </div>

            {/* Utilisation bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Current utilization</span>
                <span className="font-semibold text-indigo-600">{room.available ? Math.floor(Math.random()*50+40) : 0}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: room.available ? '65%' : '0%' }} />
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1">
                <Edit size={12}/> Edit
              </button>
              <button className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${room.available?'text-rose-600 border border-rose-200 hover:bg-rose-50':'text-emerald-600 border border-emerald-200 hover:bg-emerald-50'}`}>
                {room.available ? 'Mark Unavailable' : 'Mark Available'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
