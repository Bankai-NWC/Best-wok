import { forwardRef } from 'react'
import { IMaskInput } from 'react-imask'

interface MaskedPhoneInputProps {
  onChange: (value: string) => void
  name: string
}

const MaskedPhoneInput = forwardRef<HTMLInputElement, MaskedPhoneInputProps>(
  function MaskedPhoneInput(props, ref) {
    const { onChange, ...other } = props

    return (
      <IMaskInput
        {...other}
        mask="{+38\0} (00) 000-00-00"
        inputRef={ref}
        onAccept={(value) => onChange(value)}
        overwrite={true}
      />
    )
  },
)

export default MaskedPhoneInput
