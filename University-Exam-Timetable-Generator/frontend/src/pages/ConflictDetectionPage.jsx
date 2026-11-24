import { useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, Shield, Eye } from 'lucide-react'
import { conflicts } from '../data/sampleData'

const severityStyles = {
  high:   { badge: 'bg-rose-100 text-rose-700 border-rose-200',   icon: XCircle,       iconColor: 'text-rose-500',    ring: 'border-rose-200' },
  medium: { badge: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-500',   ring: 'border-amber-200' },
  low:    { badge: 'bg-blue-100 text-blue-700 border-blue-200',    icon: Eye,           iconColor: 'text-blue-500',    ring: 'border-blue-100' },
}

export default function ConflictDetectionPage() {
  const [data, setData] = useState(conflicts)
  const [filter, setFilter] = useState('all')   // all | unresolved | resolved

  const resolve = (id) => setData(prev => prev.map(c => c.id===id ? {...c,resolved:true} : c))

  const displayed = data.filter(c =>
    filter === 'all' ? true : filter === 'unresolved' ? !c.resolved : c.resolved
  )

  const unresolved = data.filter(c=>!c.resolved).length
  const high       = data.filter(c=>c.severity==='high'&&!c.resolved).length

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Conflicts',    value: data.length,              color: 'bg-slate-600' },
          { label: 'Unresolved',         value: unresolved,               color: 'bg-rose-600'  },
          { label: 'High Severity',      value: high,                     color: 'bg-amber-600' },
          { label: 'Resolved',           value: data.length-unresolved,   color: 'bg-emerald-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
              <Shield size={18} className="text-white"/>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Alert bar */}
      {high > 0 && (
        <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl p-4">
          <AlertTriangle size={20} className="text-rose-500 shrink-0"/>
          <div>
            <p className="font-semibold text-rose-800 text-sm">{high} High-Severity Conflict{high>1?'s':''} Detected</p>
            <p className="text-xs text-rose-600">These conflicts must be resolved before publishing the timetable.</p>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit">
        {[['all','All'],['unresolved','Unresolved'],['resolved','Resolved']].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${filter===v?'bg-indigo-600 text-white shadow':'text-slate-600 hover:bg-slate-100'}`}>
            {l}
          </button>
        ))}
      </div>

      {/* Conflict cards */}
      <div className="space-y-3">
        {displayed.map(conflict => {
          const style = severityStyles[conflict.severity]
          const Icon  = style.icon
          return (
            <div key={conflict.id} className={`bg-white rounded-xl border ${conflict.resolved?'border-slate-100 opacity-70':style.ring} shadow-sm p-5`}>
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 shrink-0 ${style.iconColor}`}><Icon size={20}/></div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-800">{conflict.type}</h4>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {conflict.severity.toUpperCase()}
                    </span>
                    {conflict.resolved && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                        RESOLVED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{conflict.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                    <span>📅 {conflict.day}</span>
                    <span>⏰ {conflict.time}</span>
                    <span>🏫 {conflict.room}</span>
                    {conflict.subject1 && <span>📚 {conflict.subject1}</span>}
                    {conflict.subject2 && <span>↔️ {conflict.subject2}</span>}
                  </div>
                </div>
                {!conflict.resolved && (
                  <button onClick={() => resolve(conflict.id)}
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                    <CheckCircle size={13}/> Mark Resolved
                  </button>
                )}
              </div>
            </div>
          )
        })}
        {displayed.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <CheckCircle size={40} className="text-emerald-400 mx-auto mb-3"/>
            <p className="font-semibold text-slate-700">No conflicts to show</p>
            <p className="text-sm text-slate-500 mt-1">All conflicts in this category have been addressed.</p>
          </div>
        )}
      </div>
    </div>
  )
}
