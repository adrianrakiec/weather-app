<template>
  <a-layout-header class="header">
    <a-typography-title :level="2" class="title"> 🌤️Weather App </a-typography-title>
    <router-link to="/weather-map" class="link">(Check weather map)</router-link>
  </a-layout-header>

  <a-layout-content>
    <div class="content">
      <SearchBar @search="searchCity" />
      <a-button type="primary" @click="useCurrentLocation" class="location-btn">
        <EnvironmentOutlined />
      </a-button>
    </div>

    <SearchHistoryList :history="searchHistoryStore.history" />

    <ResultsList v-if="weatherStore.isResults" :data="weatherStore.results" />
    <a-empty v-else-if="weatherStore.showEmptyState" description="No results found" />
    <a-skeleton v-if="weatherStore.loading" active />
  </a-layout-content>
</template>

<script setup lang="ts">
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useSavedWeatherStore } from '@/stores/useSavedWeatherStore'
import SearchBar from '@/components/SearchBar.vue'
import ResultsList from '@/components/ResultsList.vue'
import SearchHistoryList from '@/components/SearchHistoryList.vue'
import { useNotificationStore } from '@/stores/useNotificationStore'

const router = useRouter()
const weatherStore = useWeatherStore()
const searchHistoryStore = useSavedWeatherStore()
const notificationStore = useNotificationStore()

const useCurrentLocation = () => {
  if (!navigator.geolocation) {
    notificationStore.handleError('Geolocation is unsupported!')
    return
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      router.push({ path: '/weather', query: { lat: latitude, lon: longitude } })
    },
    (error) => {
      console.error(error.message)
      notificationStore.handleError(
        'The location could not be downloaded. Check your browser settings.',
      )
    },
  )
}

const searchCity = (cityName: string) => {
  weatherStore.searchCity(cityName)
}

onBeforeRouteLeave(() => {
  weatherStore.results = []
  weatherStore.hasNavigatedAway = true
})
</script>

<style scoped>
.header {
  text-align: center;
}

.title {
  padding: 1em 1em 0 1em;
}

.link {
  display: inline-block;
  color: inherit;
  font-size: 0.8rem;
  margin-bottom: 2em;
}

.content {
  display: flex;
  gap: 0.5em;
  padding: 0 1em;
  margin-bottom: 2em;
}

.location-btn {
  height: auto;
}
</style>
