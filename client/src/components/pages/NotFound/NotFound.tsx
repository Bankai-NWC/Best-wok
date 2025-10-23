import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import style from './NotFound.module.scss'

function NotFound() {
  const emoji = ['😶‍🌫️', '🥺', '🥲']
  const { t } = useTranslation()

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography fontSize={164} fontWeight={700} variant="body1">
        4{emoji[Math.floor(Math.random() * emoji.length)]}4
      </Typography>
      <Typography fontSize={36} fontWeight={600} textTransform={'uppercase'}>
        {t('pages.not_found.title')}
      </Typography>
      <Typography fontSize={32} color="text.secondary">
        {t('pages.not_found.description')}
      </Typography>
      <Typography component={Link} to="/" fontWeight={600} className={style.contained} mt={4}>
        {t('action_buttons.back_to_home')}
      </Typography>
    </Stack>
  )
}

export default NotFound
