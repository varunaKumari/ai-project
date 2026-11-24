/**
 * Root application component with React Router v6 routing.
 * Phase 2: Full dashboard with 11 navigable pages.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage        from './pages/DashboardPage'
import StudentsPage         from './pages/StudentsPage'
import SubjectsPage         from './pages/SubjectsPage'
import ClassroomsPage       from './pages/ClassroomsPage'
import ExamConfigPage       from './pages/ExamConfigPage'
import GenerateTimetablePage from './pages/GenerateTimetablePage'
import ViewTimetablePage    from './pages/ViewTimetablePage'
import ConflictDetectionPage from './pages/ConflictDetectionPage'
import AIVisualizationPage  from './pages/AIVisualizationPage'
import AnalyticsPage        from './pages/AnalyticsPage'
import SettingsPage         from './pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index                     element={<DashboardPage />} />
          <Route path="students"           element={<StudentsPage />} />
          <Route path="subjects"           element={<SubjectsPage />} />
          <Route path="classrooms"         element={<ClassroomsPage />} />
          <Route path="exam-config"        element={<ExamConfigPage />} />
          <Route path="generate"           element={<GenerateTimetablePage />} />
          <Route path="timetable"          element={<ViewTimetablePage />} />
          <Route path="conflicts"          element={<ConflictDetectionPage />} />
          <Route path="ai-visualization"  element={<AIVisualizationPage />} />
          <Route path="analytics"          element={<AnalyticsPage />} />
          <Route path="settings"           element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
