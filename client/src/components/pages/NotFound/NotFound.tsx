import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import style from './NotFound.module.scss'

function NotFound() {
  const emoji = ['😶‍🌫️', '🥺', '🥲']

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography fontSize={164} fontWeight={700} variant="body1">
        4{emoji[Math.floor(Math.random() * emoji.length)]}4
      </Typography>
      <Typography fontSize={36} fontWeight={600} textTransform={'uppercase'}>
        Ми не знайшли сторінку
      </Typography>
      <Typography fontSize={32} color="text.secondary">
        Але знаємо, де знайти багато чого смачного
      </Typography>
      <Typography component={Link} to="/" fontWeight={600} className={style.contained} mt={4}>
        Back to Menu
      </Typography>
    </Stack>
  )
}

export default NotFound
