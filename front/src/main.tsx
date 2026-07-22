import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'
import { LocaleProvider } from '@/shared/i18n/LocaleProvider'
import { ModeProvider } from '@/shared/mode/ModeProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <ModeProvider>
          <App />
        </ModeProvider>
      </LocaleProvider>
    </BrowserRouter>
  </StrictMode>,
)
