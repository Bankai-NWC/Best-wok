import { Divider, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Divider />
      <Typography
        variant="h4"
        component="h1"
        fontWeight={600}
        textTransform={'uppercase'}
        sx={{ mt: 6 }}
      >
        {t('pages.home_page_title')}
      </Typography>
    </>
  )
}

export default Home
