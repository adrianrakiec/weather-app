import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

interface SearchEntry {
  name: string
  lat: number
  lon: number
}

const STORAGE_KEY = 'searchHistory'

export const useSearchHistoryStore = defineStore('searchHistory', () => {
  const history = ref<SearchEntry[]>([])

  const loadHistory = () => {
    const savedHistory = localStorage.getItem(STORAGE_KEY)
    if (savedHistory) {
      history.value = JSON.parse(savedHistory)
    }
  }

  const saveHistory = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
  }

  const addSearch = (entry: SearchEntry) => {
    const exists = history.value.some(
      (item) => item.name === entry.name && item.lat === entry.lat && item.lon === entry.lon,
    )

    if (!exists) {
      history.value.unshift(entry)
      saveHistory()
    }
  }

  const clearHistory = () => {
    history.value = []
    localStorage.removeItem(STORAGE_KEY)
  }

  watch(history, saveHistory, { deep: true })

  loadHistory()

  return { history, addSearch, clearHistory }
})
