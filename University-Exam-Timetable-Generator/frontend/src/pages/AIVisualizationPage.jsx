import { useState } from 'react'
import { BrainCircuit, ChevronRight, ChevronLeft, RotateCcw, Play } from 'lucide-react'
import { cspSteps } from '../data/sampleData'

const actionColors = {
  'Initialise':       'bg-slate-500',
  'MRV Select':       'bg-indigo-600',
  'LCV Order':        'bg-violet-600',
  'Forward Check':    'bg-cyan-600',
  'Assign':           'bg-emerald-600',
  'Conflict Detected':'bg-rose-600',
  'Backtrack':        'bg-amber-600',
  'Complete':         'bg-emerald-700',
}

export default function AIVisualizationPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [playing, setPlaying]         = useState(false)

  const step = cspSteps[currentStep]

  const autoPlay = async () => {
    setPlaying(true)
    for (let i = currentStep; i < cspSteps.length - 1; i++) {
      await new Promise(r => setTimeout(r, 1000))
      setCurrentStep(i + 1)
    }
    setPlaying(false)
  }

  const backtracks = cspSteps.slice(0, currentStep + 1).filter(s => s.action === 'Backtrack').length

  return (
    <div className="space-y-5">
      {/* Info banner */}
      <div className="bg-gradient-to-r from-indigo-700 to-violet-700 rounded-xl p-5 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BrainCircuit size={24}/>
          <h2 className="font-bold text-lg">CSP Backtracking Visualizer</h2>
        </div>
        <p className="text-indigo-200 text-sm max-w-2xl">
          Step through the CSP solver's execution. Watch how MRV selects variables, LCV orders values, forward checking prunes domains, and backtracking handles conflicts.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Step',       value: `${currentStep+1} / ${cspSteps.length}` },
          { label: 'Action',             value: step.action },
          { label: 'Domains Remaining',  value: step.domainsLeft },
          { label: 'Backtracks',         value: backtracks },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
            <p className="text-xl font-bold text-slate-800 mt-1 truncate">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step list */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Execution Trace</h3>
          </div>
          <div className="overflow-y-auto max-h-[480px]">
            {cspSteps.map((s, i) => (
              <button key={s.step} onClick={() => setCurrentStep(i)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3 border-b border-slate-50 transition-all hover:bg-slate-50 ${i===currentStep?'bg-indigo-50 border-l-4 border-l-indigo-600':i<currentStep?'opacity-60':''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${i===currentStep?'bg-indigo-600':i<currentStep?'bg-emerald-500':'bg-slate-200 text-slate-500'}`}>
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded text-white ${actionColors[s.action]??'bg-slate-500'}`}>{s.action}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{s.variable} → {s.value}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Current step detail */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${actionColors[step.action]??'bg-slate-500'}`}>
                Step {step.step}: {step.action}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Variable (Exam)</p>
                <p className="font-bold text-slate-800 font-mono">{step.variable}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Assigned Value</p>
                <p className="font-bold text-slate-800 text-sm">{step.value}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Domains Left</p>
                <p className="font-bold text-indigo-600 text-xl">{step.domainsLeft}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Backtracks</p>
                <p className={`font-bold text-xl ${step.backtracks>0?'text-amber-600':'text-emerald-600'}`}>{step.backtracks}</p>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <p className="text-xs font-semibold text-indigo-700 mb-1">What's happening?</p>
              <p className="text-sm text-indigo-800">{step.description}</p>
            </div>
          </div>

          {/* Domain shrink visualisation */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h4 className="font-semibold text-slate-800 mb-3">Domain Size Over Time</h4>
            <div className="flex items-end gap-1 h-24">
              {cspSteps.slice(0, currentStep+1).map((s,i) => {
                const height = s.domainsLeft === 0 ? 4 : Math.round((s.domainsLeft/120)*96)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full rounded-t transition-all ${i===currentStep?'bg-indigo-600':'bg-indigo-200'}`} style={{ height: `${height}px` }}/>
                    <span className="text-xs text-slate-400">{i+1}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center gap-3">
            <button onClick={() => setCurrentStep(0)} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500" title="Reset">
              <RotateCcw size={16}/>
            </button>
            <button onClick={() => setCurrentStep(Math.max(0,currentStep-1))} disabled={currentStep===0}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 disabled:opacity-30">
              <ChevronLeft size={16}/>
            </button>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${((currentStep+1)/cspSteps.length)*100}%` }}/>
            </div>
            <button onClick={() => setCurrentStep(Math.min(cspSteps.length-1,currentStep+1))} disabled={currentStep===cspSteps.length-1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 disabled:opacity-30">
              <ChevronRight size={16}/>
            </button>
            <button onClick={autoPlay} disabled={playing || currentStep===cspSteps.length-1}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-sm font-semibold rounded-lg transition-colors">
              <Play size={14}/> {playing ? 'Playing…' : 'Auto Play'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
