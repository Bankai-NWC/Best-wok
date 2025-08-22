import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/600.css'
import '@fontsource/roboto/700.css'
import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    background: {
      default: string
      paper: string
    }
  }

  interface PaletteOptions {
    custom?: {
      primary: string
    }
  }
}

const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: { main: '#FDD835' },
    secondary: { main: '#74931D' },
    text: {
      primary: '#FFFFFF',
      secondary: '#A8A8A8',
    },
    background: {
      default: '#000000',
      paper: '#0C0C0C',
    },
    divider: '#1C1C1E',
    warning: {
      main: '#FF0000',
    },
  },
})

export default theme
