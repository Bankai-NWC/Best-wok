import { phoneNumbers } from '@/constants/phoneNumbers'
import { svgs } from '@/constants/svgs'
import { Stack, Typography } from '@mui/material'
import phone from '@svg/phone.svg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './PhonesButton.module.scss'

function NumberButton() {
  const { Arrow } = svgs
  const { t } = useTranslation()

  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive((prev) => !prev)
  }

  return (
    <button className={style.button} onClick={handleClick}>
      <Stack justifyContent="center" alignItems="center">
        <img src={phone} alt="Phone" width={24} height={24} />
      </Stack>
      <Stack flexDirection="column" alignItems={'flex-start'}>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Typography variant="body1" color="text.primary">
            +38 {phoneNumbers[0]}
          </Typography>
          <Arrow className={`${style.arrow} ${isActive ? style.active : ''}`} />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {t('general.working_hours')}
        </Typography>
      </Stack>
    </button>
  )
}

export default NumberButton
