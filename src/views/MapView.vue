<template>
  <a-button type="primary" @click="goBack" style="margin-top: 1em"><ArrowLeftOutlined /></a-button>
  <a-flex justify="space-between" align="center" style="padding: 1em">
    <a-typography-title :level="3" style="padding: 0; margin-bottom: 0"
      >🗺️ Weather Map</a-typography-title
    >
    <a-select v-model:value="selectedLayer" @change="updateWeatherLayer" style="min-width: 100px">
      <a-select-option v-for="(layer, key) in weatherLayers" :key="key" :value="key">
        {{ layer.name }}
      </a-select-option>
    </a-select>
  </a-flex>
  <div id="weather-map" class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import L, { Map, TileLayer, Marker } from 'leaflet'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { weatherLayers } from '@/helpers/weatherLayers'
import { useRouter } from 'vue-router'

const map = ref<Map | null>(null)
const weatherLayer = ref<TileLayer | null>(null)
const userMarker = ref<Marker | null>(null)
const selectedLayer = ref<string>('temp_new')

const router = useRouter()

const API_KEY = import.meta.env.VITE_API_KEY

onMounted(async () => {
  await nextTick()

  const mapElement = document.getElementById('weather-map')
  if (!mapElement) return

  map.value = L.map(mapElement, {
    center: [20, 0],
    zoom: 2,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map.value as Map)

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      map.value?.setView([latitude, longitude], 10)
      userMarker.value = L.marker([latitude, longitude]).addTo(map.value as Map)
    })
  }

  updateWeatherLayer(selectedLayer.value)
})

const updateWeatherLayer = (layerKey: string) => {
  if (!map.value) return

  if (weatherLayer.value) {
    map.value.removeLayer(weatherLayer.value as TileLayer)
  }

  weatherLayer.value = L.tileLayer(
    `https://tile.openweathermap.org/map/${layerKey}/{z}/{x}/{y}.png?appid=${API_KEY}`,
    { attribution: '© OpenWeatherMap' },
  )

  weatherLayer.value.addTo(map.value as Map)
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: 1em;
  z-index: 0;
}
</style>
