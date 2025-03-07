<template>
  <a-layout-header class="header">
    <div class="container">
      <a-flex align="center" justify="space-between" class="header-flex">
        <a-flex align="center">
          <a-button type="primary" @click="goBack"><ArrowLeftOutlined /></a-button>
          <a-typography-title :level="3" class="title">{{ data?.name || '' }}</a-typography-title>
        </a-flex>
        <a-button><PlusCircleOutlined /></a-button>
      </a-flex>
    </div>
  </a-layout-header>

  <a-layout-content>
    <a-flex vertical align="center">
      <a-skeleton v-if="!data" active />

      <template v-else>
        <img
          :src="`/weather/${data.weather[0].icon}.png`"
          alt="weather icon"
          class="weather-icon"
        />
        <a-typography-paragraph class="temperature">
          {{ Math.round(data.main.temp) }}°
        </a-typography-paragraph>
        <a-flex gap="large">
          <a-typography-paragraph class="sun-info">
            Sunrise: {{ timeFormat(data.sys.sunrise) }}
          </a-typography-paragraph>
          <a-typography-paragraph class="sun-info">
            Sunset: {{ timeFormat(data.sys.sunset) }}
          </a-typography-paragraph>
        </a-flex>
      </template>
    </a-flex>
  </a-layout-content>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PlusCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'
import { useWeatherStore } from '@/stores/useWeatherStore'
import { useSearchHistoryStore } from '@/stores/useSearchHistoryStore'
import { timeFormat } from '@/helpers/timeFormat'
import type { WeatherResponse } from '@/types/weather'

const route = useRoute()
const router = useRouter()
const weatherStore = useWeatherStore()
const searchHistoryStore = useSearchHistoryStore()

const data = ref<WeatherResponse | null>(null)

const goBack = () => {
  router.push('/')
}

onMounted(async () => {
  try {
    const lat = Number(route.query.lat)
    const lon = Number(route.query.lon)
    data.value = await weatherStore.fetchWeather(lat, lon)

    searchHistoryStore.addSearch({ name: data.value.name, lat, lon })
  } catch {
    router.push({ path: '/' })
  }
})
</script>

<style scoped>
.container {
  padding: 1em;
  margin-bottom: 2em;
}

.title {
  font-size: 2.5rem;
  margin: 0 0.5em;
}

.weather-icon {
  width: clamp(20%, 10rem, 45%);
}

.temperature {
  margin-top: 0.5em;
  font-size: 3rem;
}

.sun-info {
  font-size: 1.2rem;
}
</style>
