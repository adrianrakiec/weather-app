<template>
  <a-flex vertical gap="small" style="padding-bottom: 2em">
    <a-flex justify="space-between" align="center">
      <a-typography-title :level="3" class="title"> Next 4-day forecast </a-typography-title>
    </a-flex>

    <a-skeleton v-if="dailyWeather.length === 0" active />
    <a-collapse v-else>
      <a-collapse-panel
        v-for="(day, index) in filteredWeather"
        :key="index"
        class="forecast-card"
        :show-arrow="false"
        style="margin-bottom: 0"
      >
        <template #header>
          <a-row align="middle">
            <a-col :span="8">
              <a-typography-text class="day-name">{{ getDayName(day.date) }}</a-typography-text>
            </a-col>
            <a-col :span="10">
              <img
                :src="`/weather/${day.temperatures[Math.floor(day.temperatures.length / 2)].icon}.png`"
                alt="weather icon"
                class="weather-icon"
              />
            </a-col>
            <a-col :span="6" style="text-align: end">
              <a-typography-text class="temperature">
                {{ getDayNightTemperatures(day.temperatures) }}
              </a-typography-text>
            </a-col>
          </a-row>
        </template>
        <LineChart :temperatures="day.temperatures" />
      </a-collapse-panel>
    </a-collapse>
  </a-flex>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { weatherService } from '@/services/weather.service'
import { getDailyWeatherInfo, getDayNightTemperatures } from '@/helpers/dailyForecast'
import { getDayName } from '@/helpers/timeFormat'
import type { ForecastResult, WeatherForecastResponse } from '@/types/forecast'
import LineChart from './LineChart.vue'

const props = defineProps<{
  lat: number
  lon: number
}>()

const forecast = ref<WeatherForecastResponse>()
const dailyWeather = ref<ForecastResult[]>([])

const fetchForecast = async () => {
  if (!props.lat || !props.lon) return

  try {
    forecast.value = await weatherService.getDailyForecast(props.lat, props.lon)
    dailyWeather.value = getDailyWeatherInfo(forecast.value.list, forecast.value.city.timezone)
  } catch (error) {
    console.error('Error fetching forecast:', error)
  }
}

const filteredWeather = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return dailyWeather.value.filter((day) => day.date > today).slice(0, 4)
})

watch(() => [props.lat, props.lon], fetchForecast, { immediate: true })
</script>

<style scoped>
.forecast-container {
  max-height: 420px;
  overflow-y: auto;
}

.forecast-card {
  margin-bottom: 0.8em;
}

.day-name {
  font-weight: bold;
  font-size: 0.8rem;
}

.weather-icon {
  width: 3.5em;
  height: 3.5em;
}

.temperature {
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
