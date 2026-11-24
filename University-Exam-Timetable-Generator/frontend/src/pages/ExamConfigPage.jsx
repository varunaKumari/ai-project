import { useState } from 'react'
import { Settings2, Calendar, Clock, Plus, Trash2, CheckCircle } from 'lucide-react'
import { timeSlots, subjects, settings } from '../data/sampleData'

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

export default function ExamConfigPage() {
  const [config, setConfig] = useState(settings.algorithm)
  const [slots, setSlots]   = useState(timeSlots)

  const toggleSlot = (id) =>
    setSlots(prev => prev.map(s => s.id === id ? { ...s, available: !s.available } : s))

  return (
    <div className="space-y-6">
      {/* Header cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Exam Session',       value: settings.university.examSession },
          { label: 'Session Start',      value: settings.university.startDate   },
          { label: 'Session End',        value: settings.university.endDate     },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <Calendar size={18} className="text-white"/>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="font-bold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSP algorithm toggles */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">CSP Algorithm Settings</h3>
            <p className="text-xs text-slate-500 mt-0.5">Control which AI heuristics the solver uses</p>
          </div>
          <div className="p-4 space-y-4">
            {[
              { key:'useMRV',             label:'MRV Heuristic',              desc:'Minimum Remaining Values – pick most constrained exam first' },
              { key:'useDegree',          label:'Degree Heuristic',           desc:'Tie-break by number of constraints with other unscheduled exams' },
              { key:'useLCV',             label:'LCV Heuristic',              desc:'Least Constraining Value – pick value that rules out fewest options' },
              { key:'useForwardChecking', label:'Forward Checking',           desc:'Prune domains of neighbours after each assignment' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-700 text-sm">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
                <button
                  onClick={() => setConfig(c => ({ ...c, [key]: !c[key] }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${config[key] ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${config[key] ? 'left-5.5' : 'left-0.5'}`}
                    style={{ left: config[key] ? '1.375rem' : '0.125rem' }} />
                </button>
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600">Max Backtracks</label>
                <input type="number" defaultValue={config.maxBacktracks}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Timeout (seconds)</label>
                <input type="number" defaultValue={config.timeoutSeconds}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-100">
            <button className="w-full py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              Save Algorithm Settings
            </button>
          </div>
        </div>

        {/* Time slots */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Time Slot Configuration</h3>
              <p className="text-xs text-slate-500 mt-0.5">Toggle slots to mark them as available for exams</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors">
              <Plus size={13}/> Add Slot
            </button>
          </div>
          <div className="p-4">
            {days.map(day => {
              const daySlots = slots.filter(s => s.day === day)
              if (!daySlots.length) return null
              return (
                <div key={day} className="mb-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{day}</p>
                  <div className="space-y-2">
                    {daySlots.map(slot => (
                      <div key={slot.id} className={`flex items-center justify-between p-3 rounded-lg border transition-all ${slot.available ? 'border-indigo-100 bg-indigo-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className={slot.available ? 'text-indigo-500' : 'text-slate-400'}/>
                          <span className="text-sm font-medium text-slate-700">{slot.start} – {slot.end}</span>
                        </div>
                        <button onClick={() => toggleSlot(slot.id)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${slot.available ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {slot.available ? 'Available' : 'Off'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Exam-subject assignment */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Exam Configuration Summary</h3>
          <p className="text-xs text-slate-500 mt-0.5">Review all subjects configured for examination</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Code','Subject','Students','Duration','Priority','Status'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subjects.map((s,i)=>(
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-indigo-700 font-semibold">{s.code}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{s.name}</td>
                  <td className="px-4 py-3 text-slate-600">{s.students}</td>
                  <td className="px-4 py-3 text-slate-600">{s.duration} min</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${i<3?'bg-rose-100 text-rose-700':i<6?'bg-amber-100 text-amber-700':'bg-emerald-100 text-emerald-700'}`}>
                      {i<3?'High':i<6?'Medium':'Normal'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                      <CheckCircle size={12}/> Configured
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
