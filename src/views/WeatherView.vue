<template>
  <a-layout-header class="header">
    <div class="container">
      <a-flex align="center" justify="space-between" class="header-flex">
        <a-flex align="center">
          <a-button type="primary" @click="goBack"><ArrowLeftOutlined /></a-button>
          <a-typography-title :level="3" class="title">{{
            data?.name || 'Loading...'
          }}</a-typography-title>
        </a-flex>

        <a-button @click="toggleSavedWeather">
          <template v-if="isSaved">
            <DeleteOutlined />
          </template>
          <template v-else>
            <PlusCircleOutlined />
          </template>
        </a-button>
      </a-flex>
    </div>
  </a-layout-header>

  <a-layout-content>
    <a-flex vertical align="center">
      <a-skeleton v-if="!data || !airQuality" active />
      <a-tabs v-else class="weather-tabs" size="large">
        <a-tab-pane key="1" tab="Current"
          ><BasicWeather :data="data" :airQuality="airQuality"
        /></a-tab-pane>
        <a-tab-pane key="2" tab="Forecast"
          ><ForecastWeather :lat="data.coord.lat" :lon="data.coord.lon"
        /></a-tab-pane>
      </a-tabs>
    </a-flex>
  </a-layout-content>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PlusCircleOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useSavedWeatherStore } from '@/stores/useSavedWeatherStore'
import { useNotificationStore } from '@/stores/useNotificationStore'
import type { WeatherResponse } from '@/types/weather'
import type { SearchEntry } from '@/types/search'
import BasicWeather from '@/components/BasicWeather.vue'
import ForecastWeather from '@/components/ForecastWeather.vue'
import type { AirQuality } from '@/types/airQuality'

const route = useRoute()
const router = useRouter()
const weatherStore = useWeatherStore()
const savedWeatherStore = useSavedWeatherStore()
const notificationStore = useNotificationStore()

const data = ref<WeatherResponse | null>(null)
const airQuality = ref<AirQuality | null>(null)

const isSaved = computed(() => {
  if (!data.value) return false
  return savedWeatherStore.isSavedWeather({
    name: data.value.name,
    lat: data.value.coord.lat,
    lon: data.value.coord.lon,
  })
})

const toggleSavedWeather = () => {
  if (!data.value) return

  const entry: SearchEntry = {
    name: data.value.name,
    lat: data.value.coord.lat,
    lon: data.value.coord.lon,
  }

  if (isSaved.value) {
    savedWeatherStore.removeSavedWeather(entry)
    notificationStore.showSuccess('Location has been deleted!')
  } else {
    savedWeatherStore.addSavedWeather(entry)
    notificationStore.showSuccess('Location has been saved!')
  }
}

const goBack = () => {
  router.push('/')
}

const fetchWeatherData = async () => {
  const lat = Number(route.query.lat)
  const lon = Number(route.query.lon)
  data.value = await weatherStore.fetchWeather(lat, lon)
  airQuality.value = await weatherStore.fetchAirQuality(lat, lon)

  if (data.value) {
    savedWeatherStore.addToHistory({ name: data.value.name, lat, lon })
  } else {
    goBack()
  }
}

onMounted(() => {
  fetchWeatherData()
})

watch(
  () => [route.query.lat, route.query.lon],
  () => {
    fetchWeatherData()
  },
)
</script>

<style scoped>
.container {
  padding: 1em;
}

.title {
  font-size: 2.5rem;
  margin: 0 0.5em;
}

.weather-tabs {
  width: calc(100% - 1em);
}
</style>
