import { ZoneType } from '@/types'
import { checkZone, getCoordsFromAddress } from '@/utils/geocoding'
import { TextField, TextFieldProps } from '@mui/material'
import { useRef } from 'react'
import { FieldValues, Path, UseFormClearErrors, UseFormSetError } from 'react-hook-form'

type FormTextFieldProps<T extends FieldValues> = TextFieldProps & {
  fieldName: Path<T>
  setError: UseFormSetError<T>
  clearErrors: UseFormClearErrors<T>
  setZone: (zone: ZoneType | null) => void
  errorMessage?: string
}

function AddressFormField<T extends FieldValues>({
  fieldName,
  errorMessage,
  setError,
  clearErrors,
  setZone,
  ...props
}: FormTextFieldProps<T>) {
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  return (
    <TextField
      {...props}
      fullWidth
      error={!!errorMessage}
      helperText={errorMessage}
      onChange={(e) => {
        props.onChange?.(e)
        const value = e.target.value.trim()

        if (debounceTimer.current) clearTimeout(debounceTimer.current)

        const isComplete = /[0-9]/.test(value) && /[а-яА-Яa-zA-Z]{3,}/.test(value)

        if (!isComplete) {
          clearErrors(fieldName)
          setZone(null)
          return
        }

        debounceTimer.current = setTimeout(async () => {
          try {
            const [lat, lon] = await getCoordsFromAddress(value)
            const zone = checkZone(lat, lon)
            setZone(zone)

            if (zone === 'none') {
              setError(fieldName, {
                type: 'manual',
                message: 'Адрес вне зоны доставки',
              })
            } else {
              clearErrors(fieldName)
            }
          } catch {
            setError(fieldName, {
              type: 'manual',
              message: 'Ошибка проверки адреса',
            })
          }
        }, 1500)
      }}
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
          '&.Mui-disabled': {
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary,
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

export default AddressFormField
