import App from '@components/App'
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material'
import { store } from '@store/store'
import '@styles/_globals.scss'
import theme from '@theme/theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './i18n'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={(theme) => ({
              'input:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 100px ${theme.palette.custom.grey} inset !important`,
                WebkitTextFillColor: `${theme.palette.text.primary} !important`,
                caretColor: `${theme.palette.text.primary} !important`,
              },
              'input:-webkit-autofill:focus': {
                WebkitBoxShadow: `0 0 0 100px ${theme.palette.custom.grey} inset !important`,
              },
            })}
          />
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
