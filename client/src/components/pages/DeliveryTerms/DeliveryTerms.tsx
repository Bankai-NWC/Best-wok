import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material'
import 'leaflet/dist/leaflet.css'
import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import './DeliveryTerms.scss'

const DeliveryMap = lazy(() => import('@components/ui/DeliveryMap/DeliveryMap'))

function DeliveryTerms() {
  const { t } = useTranslation()

  return (
    <>
      <Divider />
      <Box component={'section'} mt={6}>
        <Typography
          variant="h4"
          component="h1"
          fontWeight={600}
          textTransform={'uppercase'}
          sx={{ mt: 6, fontSize: { xs: 24, md: 34 } }}
        >
          {t('pages.delivery_terms_page.title')}
        </Typography>
        <Stack direction={{ sm: 'column', md: 'row' }} gap={6} mt={6}>
          <Stack
            maxWidth={{ sm: '100%', md: '720px' }}
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
            <Stack mt={2}>
              <Typography variant="body1" component={'h1'} fontWeight={500}>
                {t('pages.delivery_terms_page.min_order_price')}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} gap={{ xs: 2, sm: 2, md: 4 }}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
                  <div className="label__green-zone"></div>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs: '12px',
                        md: '16px',
                      },
                    }}
                  >
                    299 ₴
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
                  <div className="label__blue-zone"></div>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs: '12px',
                        md: '16px',
                      },
                    }}
                  >
                    499 ₴
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
                  <div className="label__orange-zone"></div>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs: '12px',
                        md: '16px',
                      },
                    }}
                  >
                    599 ₴
                  </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={2}>
                  <div className="label__red-zone"></div>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: {
                        xs: '12px',
                        md: '16px',
                      },
                    }}
                  >
                    699 ₴
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{ maxWidth: '456px', width: '100%' }}>
            <Typography variant="body1" component={'h2'} fontWeight={500}>
              {t('pages.delivery_terms_page.subtitle_1')}
            </Typography>
            <Typography variant="body1" component={'h2'} fontWeight={500} mt={4}>
              {t('pages.delivery_terms_page.subtitle_2')}
            </Typography>
            <Typography variant="body1" mt={1}>
              {t('pages.delivery_terms_page.payment_method_1')}
              <br />
              {t('pages.delivery_terms_page.payment_method_2')}
              <br />
              {t('pages.delivery_terms_page.payment_method_3')}
            </Typography>
            <Typography variant="body1" component={'h2'} fontWeight={500} mt={4}>
              {t('pages.delivery_terms_page.subtitle_3')}
            </Typography>
            <Typography variant="body1" mt={1}>
              {t('pages.delivery_terms_page.payment_accept')}
            </Typography>
            <Stack direction="row" alignItems="center" gap={2} mt={4}>
              <Typography variant="body1" component={'h2'} fontWeight={500}>
                {t('pages.delivery_terms_page.subtitle_4')}
              </Typography>
              <div className="sale">
                <Typography fontSize={12}>-10%</Typography>
              </div>
            </Stack>
            <Typography variant="body1" mt={1}>
              {t('pages.delivery_terms_page.pickup_text_1')}
              <br />
              {t('pages.delivery_terms_page.pickup_text_2')}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default DeliveryTerms
