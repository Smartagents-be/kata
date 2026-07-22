import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/AppShell'
import { steps } from '@/content'
import { StepPage } from '@/routes/StepPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to={`/steps/${steps[0].id}`} replace />} />
        <Route path="steps/:stepId" element={<StepPage />} />
        <Route path="*" element={<StepPage />} />
      </Route>
    </Routes>
  )
}
