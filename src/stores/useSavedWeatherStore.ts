import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { SearchEntry } from '@/types/search'

const STORAGE_KEY = 'savedWeather'

export const useSavedWeatherStore = defineStore('savedWeather', () => {
  const savedWeather = ref<SearchEntry[]>([])
  const history = ref<SearchEntry[]>([])

  const loadSavedWeather = () => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      savedWeather.value = JSON.parse(savedData)
    }
  }

  const saveSavedWeather = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWeather.value))
  }

  const addSavedWeather = (entry: SearchEntry) => {
    const exists = savedWeather.value.some(
      (item) => item.name === entry.name && item.lat === entry.lat && item.lon === entry.lon,
    )

    if (!exists) {
      savedWeather.value.unshift(entry)
      saveSavedWeather()
    }
  }

  const removeSavedWeather = (entry: SearchEntry) => {
    savedWeather.value = savedWeather.value.filter(
      (item) => item.name !== entry.name || item.lat !== entry.lat || item.lon !== entry.lon,
    )
    saveSavedWeather()
  }

  const addToHistory = (entry: SearchEntry) => {
    const exists = history.value.some(
      (item) => item.name === entry.name && item.lat === entry.lat && item.lon === entry.lon,
    )

    if (!exists) {
      history.value.unshift(entry)
    }

    if (history.value.length > 5) {
      history.value.pop()
    }
  }

  const clearSavedWeather = () => {
    savedWeather.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  loadSavedWeather()

  watch(savedWeather, saveSavedWeather, { deep: true })

  return {
    savedWeather,
    history,
    addSavedWeather,
    removeSavedWeather,
    clearSavedWeather,
    addToHistory,
  }
})
