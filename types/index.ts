export interface City {
  id: string
  name_en: string
  name_local: string
  country_code: string
  lat: number
  lng: number
  is_hotspot: boolean
  hotspot_rank: number | null
  region: string
  type: string
  created_at: string
}

export interface Checkin {
  id: string
  city_id: string
  message: string
  lang: string
  created_at: string
  expires_at: string
}

export interface CityStatus {
  city_id: string
  name_en: string
  name_local: string
  country_code: string
  lat: number
  lng: number
  is_hotspot: boolean
  hotspot_rank: number | null
  count_24h: number
}
