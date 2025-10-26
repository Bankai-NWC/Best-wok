import { blueZones, greenZones, orangeZones, redZones } from '@/constants/deliveryZones'
import { CategoryImages } from '@constants/images'
import { Box, Divider, Stack, Typography } from '@mui/material'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from 'react-i18next'
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet'
import './DeliveryTerms.scss'

function DeliveryTerms() {
  const { t } = useTranslation()

  const { customPin } = CategoryImages
  const customIcon = L.icon({
    iconUrl: customPin,
    iconSize: [26, 32],
    iconAnchor: [13, 32],
    popupAnchor: [0, -32],
  })

  const fillBlueOptions = { color: '#49A6D8', fillColor: '#49A6D8', fillOpacity: 0.3 }
  const fillGreenOptions = { color: '#2FA86D', fillColor: '#2FA86D', fillOpacity: 0.3 }
  const fillOrangeOptions = { color: '#F29B43', fillColor: '#F29B43', fillOpacity: 0.3 }
  const fillRedOptions = { color: '#FC6D6B', fillColor: '#FC6D6B', fillOpacity: 0.3 }

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
            <MapContainer
              center={{ lat: 47.839, lng: 35.137 }}
              zoom={11}
              style={{ width: '100%', height: '100%', borderRadius: '8px' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[47.827101, 35.165119]} icon={customIcon}>
                <Popup>{t('pages.delivery_terms_page.pickup_point')}</Popup>
              </Marker>
              <Polygon pathOptions={fillRedOptions} positions={redZones}>
                <Popup>{t('pages.delivery_terms_page.delivery_red_zone')}</Popup>
              </Polygon>
              <Polygon pathOptions={fillOrangeOptions} positions={orangeZones}>
                <Popup>{t('pages.delivery_terms_page.delivery_orange_zone')}</Popup>
              </Polygon>
              <Polygon pathOptions={fillBlueOptions} positions={blueZones}>
                <Popup>{t('pages.delivery_terms_page.delivery_blue_zone')}</Popup>
              </Polygon>
              <Polygon pathOptions={fillGreenOptions} positions={greenZones}>
                <Popup>{t('pages.delivery_terms_page.delivery_green_zone')}</Popup>
              </Polygon>
            </MapContainer>
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
