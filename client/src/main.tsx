import App from '@components/App'
import { CssBaseline, ThemeProvider } from '@mui/material'
import '@styles/_globals.scss'
import theme from '@theme/theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
