import { TextField, TextFieldProps } from '@mui/material'

type FormTextFieldProps = TextFieldProps & {
  errorMessage?: string
}

function TextFormField({ errorMessage, ...props }: FormTextFieldProps) {
  return (
    <TextField
      {...props}
      variant="filled"
      fullWidth
      error={!!errorMessage}
      helperText={errorMessage}
      sx={{
        '& .MuiFilledInput-root': {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          '&::before': {
            borderBottomColor: (theme) => theme.palette.custom.grey,
          },
          '&.Mui-focused': {
            backgroundColor: (theme) => theme.palette.custom.grey,
          },
          '&:hover': {
            backgroundColor: (theme) => theme.palette.custom.grey,
            '&::before': {
              borderBottomColor: (theme) => theme.palette.custom.grey,
            },
          },
        },
      }}
    />
  )
}

export default TextFormField
