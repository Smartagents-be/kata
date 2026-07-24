import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
// Imported for its side effect: initialises the one i18next instance before anything renders.
import '@/shared/i18n/i18n'
import { ModeProvider } from '@/shared/mode/ModeProvider'
import { ProgressProvider } from '@/shared/progress/ProgressProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModeProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </ModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
