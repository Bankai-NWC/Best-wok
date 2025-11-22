import { blueZones, greenZones, orangeZones, redZones } from '@/constants/deliveryZones'
import { MapImages } from '@constants/images'
import L from 'leaflet'
import { useTranslation } from 'react-i18next'
import { MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet'
import './DeliveryMap.scss'

const { customPin } = MapImages
const customIcon = L.icon({
  iconUrl: customPin,
  iconSize: [26, 32],
  iconAnchor: [13, 32],
  popupAnchor: [0, -32],
})

const fillBlueOptions = { color: '#49A6D8', fillColor: '#49A6D8', fillOpacity: 0.3, weight: 1 }
const fillGreenOptions = { color: '#2FA86D', fillColor: '#2FA86D', fillOpacity: 0.3, weight: 1 }
const fillOrangeOptions = { color: '#F29B43', fillColor: '#F29B43', fillOpacity: 0.3, weight: 1 }
const fillRedOptions = { color: '#FC6D6B', fillColor: '#FC6D6B', fillOpacity: 0.3, weight: 1 }

function DeliveryMap() {
  const { t } = useTranslation()

  return (
    <MapContainer
      center={{ lat: 47.839, lng: 35.137 }}
      zoom={11}
      style={{ width: '100%', height: '100%', borderRadius: '8px' }}
      preferCanvas={true}
      scrollWheelZoom={false}
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
  )
}

export default DeliveryMap
