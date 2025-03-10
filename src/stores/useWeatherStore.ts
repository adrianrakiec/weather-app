import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { weatherService } from '@/services/weather.service'
import { useNotificationStore } from '@/stores/useNotificationStore'
import type { CityInfo } from '@/types/city'
import type { WeatherResponse } from '@/types/weather'

export const useWeatherStore = defineStore('weather', () => {
  const results = ref<CityInfo[]>([])
  const weatherData = ref<WeatherResponse | null>(null)
  const loading = ref(false)

  const notificationStore = useNotificationStore()

  const isResults = computed(() => results.value.length > 0)

  const searchCity = async (cityName: string) => {
    loading.value = true
    results.value = []
    try {
      results.value = await weatherService.getCoordinatesByCity(cityName)
    } catch (e) {
      notificationStore.handleError(e)
    } finally {
      loading.value = false
    }

    return results.value
  }

  const fetchWeather = async (lat: number, lon: number) => {
    loading.value = true
    try {
      weatherData.value = await weatherService.getWeatherByCoordinates(lat, lon)
    } catch (e) {
      notificationStore.handleError(e)
    } finally {
      loading.value = false
    }

    return weatherData.value
  }

  return { results, loading, isResults, searchCity, fetchWeather }
})
