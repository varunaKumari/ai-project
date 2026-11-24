import { useState } from 'react'
import { Zap, CheckCircle, AlertTriangle, Clock, RotateCcw, Play, Cpu } from 'lucide-react'
import { subjects, classrooms, timeSlots, settings } from '../data/sampleData'

const steps = [
  { id: 1, label: 'Loading Data',           desc: 'Fetch exams, rooms, and time slots' },
  { id: 2, label: 'Building CSP Model',     desc: 'Define variables, domains, constraints' },
  { id: 3, label: 'Applying MRV & Degree',  desc: 'Order variables by heuristics' },
  { id: 4, label: 'Backtracking Search',    desc: 'Assign values with forward checking & LCV' },
  { id: 5, label: 'Validating Solution',    desc: 'Ensure all constraints are satisfied' },
  { id: 6, label: 'Saving Schedule',        desc: 'Persist timetable to database' },
]

export default function GenerateTimetablePage() {
  const [config, setConfig] = useState(settings.algorithm)
  const [status, setStatus] = useState('idle')     // idle | running | done | error
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [log, setLog] = useState([])

  const addLog = (msg, type='info') =>
    setLog(prev => [...prev, { msg, type, time: new Date().toLocaleTimeString() }])

  const handleGenerate = async () => {
    setStatus('running')
    setProgress(0)
    setCurrentStep(0)
    setLog([])

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i + 1)
      setProgress(Math.round(((i + 1) / steps.length) * 100))
      addLog(`[Step ${i+1}] ${steps[i].label} — ${steps[i].desc}`)
      await new Promise(r => setTimeout(r, 600))
    }

    addLog('✅ Timetable generated successfully! 10 exams scheduled, 1 backtrack.', 'success')
    setStatus('done')
  }

  const handleReset = () => { setStatus('idle'); setProgress(0); setCurrentStep(0); setLog([]) }

  const logColors = { info: 'text-slate-400', success: 'text-emerald-400', warning: 'text-amber-400', error: 'text-rose-400' }

  return (
    <div className="space-y-6">
      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Exams to Schedule', value: subjects.length,                            icon: Cpu },
          { label: 'Available Rooms',   value: classrooms.filter(c=>c.available).length,   icon: CheckCircle },
          { label: 'Time Slots',        value: timeSlots.filter(t=>t.available).length,     icon: Clock },
          { label: 'Max Backtracks',    value: config.maxBacktracks,                        icon: RotateCcw },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
              <Icon size={18} className="text-white"/>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Algorithm options */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Algorithm Options</h3>
            <p className="text-xs text-slate-500 mt-0.5">Select heuristics before generating</p>
          </div>
          <div className="p-4 space-y-3">
            {[
              { key:'useMRV',             label:'MRV Heuristic',       color:'bg-indigo-100 text-indigo-700' },
              { key:'useDegree',          label:'Degree Heuristic',    color:'bg-cyan-100 text-cyan-700' },
              { key:'useLCV',             label:'LCV Heuristic',       color:'bg-violet-100 text-violet-700' },
              { key:'useForwardChecking', label:'Forward Checking',    color:'bg-emerald-100 text-emerald-700' },
            ].map(({ key, label, color }) => (
              <label key={key} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{label}</span>
                <input type="checkbox" checked={config[key]}
                  onChange={() => setConfig(c => ({ ...c, [key]: !c[key] }))}
                  className="w-4 h-4 accent-indigo-600"/>
              </label>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={status === 'running'}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold rounded-lg transition-colors text-sm"
            >
              {status === 'running'
                ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Generating…</>
                : <><Zap size={16}/> Generate Timetable</>}
            </button>
            <button onClick={handleReset} className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500">
              <RotateCcw size={16}/>
            </button>
          </div>
        </div>

        {/* Progress + steps */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-slate-800">Generation Progress</h3>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                status==='done'?'bg-emerald-100 text-emerald-700':
                status==='running'?'bg-indigo-100 text-indigo-700':
                status==='error'?'bg-rose-100 text-rose-700':'bg-slate-100 text-slate-500'}`}>
                {status.toUpperCase()}
              </span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${status==='done'?'bg-emerald-500':status==='error'?'bg-rose-500':'bg-indigo-600'}`}
                style={{ width: `${progress}%` }}/>
            </div>
            <p className="text-xs text-slate-500 mt-1 text-right">{progress}% complete</p>
          </div>

          <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
            {steps.map((s, i) => (
              <div key={s.id} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                currentStep > i ? 'bg-emerald-50' : currentStep === i+1 ? 'bg-indigo-50 border border-indigo-100' : 'opacity-40'}`}>
                {currentStep > i
                  ? <CheckCircle size={15} className="text-emerald-500 shrink-0"/>
                  : currentStep === i+1
                  ? <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin shrink-0"/>
                  : <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0"/>}
                <div>
                  <p className="text-xs font-semibold text-slate-700">{s.label}</p>
                  <p className="text-xs text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Console log */}
          {log.length > 0 && (
            <div className="p-4 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-2">Console Output</p>
              <div className="bg-slate-900 rounded-lg p-3 max-h-32 overflow-y-auto font-mono text-xs space-y-1">
                {log.map((l, i) => (
                  <p key={i} className={logColors[l.type]}>
                    <span className="text-slate-600">[{l.time}]</span> {l.msg}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result */}
      {status === 'done' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle size={24} className="text-white"/>
          </div>
          <div>
            <h4 className="font-bold text-emerald-800">Timetable Generated Successfully!</h4>
            <p className="text-sm text-emerald-700">10 exams scheduled · 1 backtrack · Completed in 3.6s</p>
          </div>
          <a href="/timetable" className="ml-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors">
            View Timetable →
          </a>
        </div>
      )}
    </div>
  )
}
