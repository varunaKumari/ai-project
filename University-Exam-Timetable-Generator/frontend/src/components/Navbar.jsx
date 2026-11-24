/**
 * Navbar component – shown on every page.
 */

import { GraduationCap, Calendar, BookOpen, Building2, Clock } from 'lucide-react'

const navLinks = [
  { label: 'Dashboard', icon: Calendar, href: '#' },
  { label: 'Exams', icon: BookOpen, href: '#' },
  { label: 'Rooms', icon: Building2, href: '#' },
  { label: 'Timeslots', icon: Clock, href: '#' },
]

export default function Navbar() {
  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <GraduationCap size={28} />
            <span className="font-bold text-lg tracking-tight">
              Exam Timetable Generator
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-1.5 text-sm font-medium text-indigo-100 hover:text-white transition-colors"
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
