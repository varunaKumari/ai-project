/**
 * Reusable stat card used on the Dashboard.
 */

export default function StatCard({ title, value, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
  }

  return (
    <div className={`rounded-xl border p-5 flex items-center gap-4 ${colorMap[color] ?? colorMap.indigo}`}>
      <div className="p-3 rounded-full bg-white shadow-sm">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest opacity-70">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  )
}
