import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/shared/components/AppShell'
import { CatalogPage } from '@/shared/routes/CatalogPage'
import { PresentationPage } from '@/shared/routes/PresentationPage'
import { StepPage } from '@/shared/routes/StepPage'
import { UnitPage } from '@/shared/routes/UnitPage'
import { firstUnitPath, steps } from '@/steps'

export default function App() {
  return (
    <Routes>
      {/* Outside AppShell, and ahead of its catch-all: the deck is the whole window, with no
          header, card or sidebar rendering behind it. */}
      <Route path="present" element={<PresentationPage />} />
      <Route element={<AppShell />}>
        <Route index element={<Navigate to={firstUnitPath(steps[0])} replace />} />
        {/* A step has no page of its own; StepPage forwards to its first unit. */}
        <Route path="steps/:stepId" element={<StepPage />} />
        <Route path="steps/:stepId/:unitId" element={<UnitPage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="*" element={<StepPage />} />
      </Route>
    </Routes>
  )
}
