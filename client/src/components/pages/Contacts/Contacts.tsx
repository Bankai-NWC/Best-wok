import { MapImages } from '@/constants/images'
import { phoneNumbers } from '@/constants/phoneNumbers'
import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import style from './Contacts.module.scss'

const DeliveryMap = lazy(() => import('@components/ui/DeliveryMap/DeliveryMap'))

function Contacts() {
  const { t } = useTranslation()
  const { customPin } = MapImages

  return (
    <>
      <Divider />
      <Box component={'section'}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          textTransform={'uppercase'}
          sx={{ mt: 6, fontSize: { xs: 24, md: 34 } }}
        >
          {t('pages.contacts.title')}
        </Typography>
        <Stack direction={{ md: 'column', lg: 'row' }} gap={6} mt={6}>
          <Stack
            maxWidth={{ md: '100%', lg: '720px' }}
            width={'100%'}
            height={570}
            className="map-container"
          >
            <Suspense
              fallback={
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: 2 }}
                />
              }
            >
              <DeliveryMap />
            </Suspense>
          </Stack>
          <Box className={style.card}>
            <img src={customPin} alt="pin" width={28} height={32} />
            <Typography variant="body1">{t('pages.delivery_terms_page.pickup_point')}</Typography>
          </Box>
        </Stack>
        <Stack mt={6}>
          <Box component={'section'}>
            <Typography variant="body1" fontWeight={500}>
              {t('pages.contacts.restaurant')}
            </Typography>
            <Typography variant="body2" fontWeight={500} mt={2}>
              {t('pages.contacts.addresses._1.city')}:
            </Typography>
            <Typography variant="body1" ml={6}>
              {t('pages.contacts.addresses._1.address')}:
            </Typography>
          </Box>

          <Box component={'section'}>
            <Typography variant="body1" mt={6} fontWeight={500}>
              {t('pages.contacts.phone_numbers')}:
            </Typography>
            <ul className={style['phone-numbers']}>
              {phoneNumbers.map((number) => (
                <li key={number}>
                  <Typography variant="body2" mt={2} component={'a'} href={`tel:${number}`}>
                    {number}
                  </Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default Contacts
