import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { weatherService } from '@/services/weather.service'
import type { CityInfo } from '@/types/city'

export const useWeatherStore = defineStore('weather', () => {
  const results = ref<CityInfo[]>([])
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
  }

  return { results, loading, isResults, searchCity }
})
