import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted variable fonts — the families the Rotaris design system specifies.
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/manrope'
import '@fontsource-variable/jetbrains-mono'

// Phosphor icons, self-hosted rather than pulled from a CDN at runtime.
import '@phosphor-icons/web/regular'
import '@phosphor-icons/web/fill'

import './styles/tokens/colors.css'
import './styles/tokens/typography.css'
import './styles/tokens/spacing.css'
import './styles/tokens/effects.css'
import './styles/base.css'
import './styles/components.css'
import './styles/motif.css'
import './styles/site.css'

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
