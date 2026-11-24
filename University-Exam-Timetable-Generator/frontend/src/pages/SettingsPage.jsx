import { useState } from 'react'
import { Save, Bell, Shield, Database, Palette, University, ChevronDown } from 'lucide-react'
import { settings } from '../data/sampleData'

const sections = [
  { id: 'university', label: 'University Info',    icon: University },
  { id: 'algorithm',  label: 'Algorithm Settings', icon: Database   },
  { id: 'notify',     label: 'Notifications',      icon: Bell       },
  { id: 'security',   label: 'Security',           icon: Shield     },
  { id: 'appearance', label: 'Appearance',         icon: Palette    },
]

const ToggleSwitch = ({ checked, onChange }) => (
  <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked?'bg-indigo-600':'bg-slate-300'}`}>
    <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
      style={{ left: checked ? '1.375rem' : '0.125rem' }}/>
  </button>
)

export default function SettingsPage() {
  const [active, setActive] = useState('university')
  const [uni, setUni]       = useState(settings.university)
  const [algo, setAlgo]     = useState(settings.algorithm)
  const [notif, setNotif]   = useState(settings.notifications)
  const [saved, setSaved]   = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2000) }

  return (
    <div className="flex gap-6">
      {/* Sidebar nav */}
      <div className="w-56 shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {sections.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-slate-50 last:border-0 transition-all ${active===id?'bg-indigo-50 text-indigo-700 border-l-4 border-l-indigo-600':'text-slate-600 hover:bg-slate-50'}`}>
              <Icon size={15}/> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        {active === 'university' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-5 border-b border-slate-100"><h3 className="font-semibold text-slate-800">University Information</h3></div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label:'University Name',  key:'name',          type:'text'   },
                { label:'Short Name',       key:'shortName',     type:'text'   },
                { label:'Exam Session',     key:'examSession',   type:'text'   },
                { label:'Session Start',    key:'startDate',     type:'date'   },
                { label:'Session End',      key:'endDate',       type:'date'   },
                { label:'Timezone',         key:'timezone',      type:'text'   },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                  <input type={type} value={uni[key]}
                    onChange={e => setUni(u=>({...u,[key]:e.target.value}))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"/>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'algorithm' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-5 border-b border-slate-100"><h3 className="font-semibold text-slate-800">Algorithm Settings</h3></div>
            <div className="p-5 space-y-4">
              {[
                { key:'useMRV',             label:'MRV Heuristic',    desc:'Select variable with fewest remaining values' },
                { key:'useDegree',          label:'Degree Heuristic', desc:'Tie-break by constraint count' },
                { key:'useLCV',             label:'LCV Heuristic',    desc:'Prefer least constraining value' },
                { key:'useForwardChecking', label:'Forward Checking', desc:'Prune neighbour domains eagerly' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <ToggleSwitch checked={algo[key]} onChange={() => setAlgo(a=>({...a,[key]:!a[key]}))}/>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[['maxBacktracks','Max Backtracks'],['timeoutSeconds','Solver Timeout (s)']].map(([k,l])=>(
                  <div key={k}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{l}</label>
                    <input type="number" value={algo[k]} onChange={e=>setAlgo(a=>({...a,[k]:+e.target.value}))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {active === 'notify' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-5 border-b border-slate-100"><h3 className="font-semibold text-slate-800">Notification Preferences</h3></div>
            <div className="p-5 space-y-4">
              {[
                { key:'emailOnGenerate', label:'Email on timetable generation',  desc:'Send an email when a new schedule is generated' },
                { key:'emailOnConflict', label:'Email on conflict detection',    desc:'Alert when scheduling conflicts are found' },
                { key:'emailOnComplete', label:'Email when schedule is published',desc:'Notify when timetable is published to students' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <ToggleSwitch checked={notif[key]} onChange={()=>setNotif(n=>({...n,[key]:!n[key]}))}/>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'security' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-5 border-b border-slate-100"><h3 className="font-semibold text-slate-800">Security Settings</h3></div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[['Current Password','password'],['New Password','password'],['Confirm New Password','password']].map(([l,t])=>(
                  <div key={l} className="md:col-span-1">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">{l}</label>
                    <input type={t} placeholder="••••••••" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs font-semibold text-amber-700">Two-Factor Authentication is not enabled. <span className="underline cursor-pointer">Enable now</span></p>
              </div>
            </div>
          </div>
        )}

        {active === 'appearance' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-5 border-b border-slate-100"><h3 className="font-semibold text-slate-800">Appearance</h3></div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Theme</label>
                <div className="flex gap-3">
                  {['Light','Dark','System'].map(t=>(
                    <button key={t} className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${t==='Light'?'bg-indigo-600 text-white border-indigo-600':'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Accent Colour</label>
                <div className="flex gap-2">
                  {['bg-indigo-600','bg-cyan-600','bg-violet-600','bg-emerald-600','bg-rose-600'].map(c=>(
                    <button key={c} className={`w-8 h-8 rounded-full ${c} ring-offset-2 ${c==='bg-indigo-600'?'ring-2 ring-indigo-600':''}`}/>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Sidebar Style</label>
                <div className="flex gap-3">
                  {['Expanded','Compact'].map(s=>(
                    <button key={s} className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${s==='Expanded'?'bg-indigo-600 text-white border-indigo-600':'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <button onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 font-semibold rounded-lg transition-all text-sm ${saved?'bg-emerald-600 text-white':'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
            <Save size={15}/> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
