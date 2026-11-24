import { useState } from 'react'
import { Search, Plus, Filter, ChevronUp, ChevronDown, Mail, Edit, Trash2, Users } from 'lucide-react'
import { students } from '../data/sampleData'

const deptColors = {
  'Computer Science':        'bg-indigo-100 text-indigo-700',
  'Electrical Engineering':  'bg-cyan-100 text-cyan-700',
  'Mechanical Engineering':  'bg-amber-100 text-amber-700',
  'Civil Engineering':       'bg-emerald-100 text-emerald-700',
}

export default function StudentsPage() {
  const [search, setSearch]   = useState('')
  const [deptFilter, setDept] = useState('All')
  const [sortField, setSort]  = useState('name')
  const [sortAsc, setSortAsc] = useState(true)

  const departments = ['All', ...new Set(students.map(s => s.department))]

  const filtered = students
    .filter(s => {
      const q = search.toLowerCase()
      return (
        (deptFilter === 'All' || s.department === deptFilter) &&
        (s.name.toLowerCase().includes(q) || s.regNo.toLowerCase().includes(q) || s.email.toLowerCase().includes(q))
      )
    })
    .sort((a, b) => {
      const v = a[sortField] < b[sortField] ? -1 : a[sortField] > b[sortField] ? 1 : 0
      return sortAsc ? v : -v
    })

  const toggleSort = (field) => {
    if (sortField === field) setSortAsc(!sortAsc)
    else { setSort(field); setSortAsc(true) }
  }

  const SortIcon = ({ field }) =>
    sortField === field
      ? (sortAsc ? <ChevronUp size={13} /> : <ChevronDown size={13} />)
      : <ChevronDown size={13} className="opacity-30" />

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: students.length,                                      color: 'bg-indigo-600' },
          { label: 'Active',         value: students.filter(s=>s.status==='active').length,        color: 'bg-emerald-500' },
          { label: 'Inactive',       value: students.filter(s=>s.status==='inactive').length,      color: 'bg-slate-400' },
          { label: 'Departments',    value: new Set(students.map(s=>s.department)).size,            color: 'bg-cyan-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center gap-3">
            <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
              <Users size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-100">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search by name, reg no or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            value={deptFilter}
            onChange={e => setDept(e.target.value)}
          >
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus size={15} /> Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[['name','Name'],['regNo','Reg No'],['department','Department'],['semester','Sem']].map(([field,label]) => (
                  <th key={field} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-700" onClick={() => toggleSort(field)}>
                    <span className="flex items-center gap-1">{label} <SortIcon field={field} /></span>
                  </th>
                ))}
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {s.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
                      <span className="font-medium text-slate-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 font-mono text-xs">{s.regNo}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${deptColors[s.department] ?? 'bg-slate-100 text-slate-600'}`}>
                      {s.department}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-center">{s.semester}</td>
                  <td className="px-4 py-3 text-slate-500">{s.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${s.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Mail size={14} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><Edit size={14} /></button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} of {students.length} students</span>
          <div className="flex gap-1">
            {[1,2,3].map(p=>(
              <button key={p} className={`w-7 h-7 rounded flex items-center justify-center font-medium ${p===1?'bg-indigo-600 text-white':'hover:bg-slate-100'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
