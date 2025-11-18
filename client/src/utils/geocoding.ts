import { blueZones, greenZones, orangeZones, redZones } from '@/constants/deliveryZones'
import * as turf from '@turf/turf'
import { LatLngExpression } from 'leaflet'

type NominatimResult = {
  lat: number
  lon: number
  importance: number
  type: string
}

export function normalizeAddress(raw: string): string {
  const map: Record<string, string> = {
    'пр.': 'проспект',
    'просп.': 'проспект',
    просп: 'проспект',
    'вул.': 'вулиця',
    вул: 'вулиця',
    'пров.': 'провулок',
    пров: 'провулок',
    'пл.': 'площа',
    пл: 'площа',
    'бул.': 'бульвар',
    бул: 'бульвар',
    'наб.': 'набережна',
    наб: 'набережна',
  }
  let address = raw.trim().replace(/\s+/g, ' ')
  for (const [abbr, full] of Object.entries(map)) {
    const regex = new RegExp(`(^|[\\s,])${abbr}(?=[\\s,]|$)`, 'gi')
    address = address.replace(regex, `$1${full}`)
  }

  address = address.replace(/^\d+\s*,?\s*/, '')
  return address
}

export async function getCoordsFromAddress(address: string): Promise<[number, number]> {
  const normalized = normalizeAddress(address)

  const languages = ['uk', 'ru', 'en']
  let data: any[] = []

  for (const lang of languages) {
    const query = new URLSearchParams({
      q: `Запоріжжя, ${normalized}`,
      format: 'json',
      countrycodes: 'ua',
      limit: '5',
      addressdetails: '1',
      'accept-language': lang,
    })
    const url = `https://nominatim.openstreetmap.org/search?${query.toString()}`

    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Best Wok delivery' },
      })
      data = await res.json()
      if (data.length) break
    } catch (err) {
      console.warn(`Error while requesting Nominatim (${lang}):`, err)
    }
  }

  if (!data.length) throw new Error('Address not found')

  const best = data
    .map(
      (c: any): NominatimResult => ({
        lat: parseFloat(c.lat),
        lon: parseFloat(c.lon),
        importance: c.importance || 0,
        type: c.type,
      }),
    )
    .sort((a: NominatimResult, b: NominatimResult) => {
      const tA = ['house', 'building', 'apartments'].includes(a.type) ? 1 : 0
      const tB = ['house', 'building', 'apartments'].includes(b.type) ? 1 : 0
      return tB - tA || b.importance - a.importance
    })[0]

  return [best.lat, best.lon]
}

const normalizeCoords = (point: LatLngExpression): [number, number] => {
  if (Array.isArray(point)) return [point[0], point[1]]
  if ('lat' in point && 'lng' in point) return [point.lat, point.lng]
  throw new Error('Invalid coordinate format')
}

export const checkZone = (
  lat: number,
  lng: number,
): 'green' | 'blue' | 'orange' | 'red' | 'none' => {
  const point = turf.point([lng, lat])

  const check = (zones: LatLngExpression[][]) => {
    for (const polygon of zones) {
      const coords = polygon.map((p) => {
        const [plat, plng] = normalizeCoords(p)
        return [plng, plat] as [number, number]
      })
      if (
        coords.length > 0 &&
        (coords[0][0] !== coords[coords.length - 1][0] ||
          coords[0][1] !== coords[coords.length - 1][1])
      ) {
        coords.push(coords[0])
      }
      const turfPolygon = turf.polygon([coords])
      if (turf.booleanPointInPolygon(point, turfPolygon)) return true
    }
    return false
  }

  if (check(greenZones)) return 'green'
  if (check(blueZones)) return 'blue'
  if (check(orangeZones)) return 'orange'
  if (check(redZones)) return 'red'
  return 'none'
}
