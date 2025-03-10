import { http } from '@/services/http.service'
import type { CityInfo } from '@/types/city'
import type { WeatherResponse } from '@/types/weather'

const URL = import.meta.env.VITE_API_ENDPOINT

export const weatherService = {
  async getCoordinatesByCity(cityName: string) {
    try {
      const response = await http.get<CityInfo[]>(`${URL}/geo/1.0/direct`, {
        params: {
          q: cityName,
          limit: 5,
        },
      })

      return response.data
    } catch {
      throw new Error('No results')
    }
  },

  async getWeatherByCoordinates(lat: number, lon: number) {
    try {
      const response = await http.get<WeatherResponse>(`${URL}/data/2.5/weather`, {
        params: {
          lat,
          lon,
          units: 'metric',
        },
      })

      return response.data
    } catch {
      throw new Error('Location not found')
    }
  },
}
