import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { weatherService } from '@/services/weather.service'
import type { CityInfo } from '@/types/city'
import type { WeatherResponse } from '@/types/weather'

export const useWeatherStore = defineStore('weather', () => {
  const results = ref<CityInfo[]>([])
  const weatherData = ref<WeatherResponse | null>(null)
  const loading = ref(false)

  const isResults = computed(() => results.value.length > 0)

  async function searchCity(cityName: string) {
    loading.value = true
    results.value = []
    try {
      results.value = await weatherService.getCoordinatesByCity(cityName)
    } finally {
      loading.value = false
    }

    return results.value
  }

  async function fetchWeather(lat: number, lon: number) {
    loading.value = true
    try {
      weatherData.value = await weatherService.getWeatherByCoordinates(lat, lon)
    } finally {
      loading.value = false
    }

    return weatherData.value
  }

  return { results, loading, isResults, searchCity, fetchWeather }
})
