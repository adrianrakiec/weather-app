<template>
  <a-flex vertical gap="small">
    <a-flex justify="space-between" align="center">
      <a-typography-title :level="3" class="title">
        Next 3-day forecast
      </a-typography-title>
    </a-flex>

    <div class="forecast-container">
      <a-card v-for="(day, index) in dailyWeather" :key="index" class="forecast-card">
        <a-row align="middle">
          <a-col :span="6">
            <a-typography-text class="day-name">{{ getDayName(day.date) }}</a-typography-text>
          </a-col>
          <a-col :span="14">
            <img :src="`/weather/${day.icon}.png`" alt="weather icon" class="weather-icon" />
          </a-col>
          <a-col :span="4" style="text-align: end">
            <a-typography-text class="temperature">
              {{ Math.round(day.tempDay) }}° / {{ Math.round(day.tempNight) }}°
            </a-typography-text>
          </a-col>
        </a-row>
      </a-card>
    </div>
  </a-flex>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { weatherService } from '@/services/weather.service'
import { getDailyWeatherInfo } from '@/helpers/dailyForecast'
import { getDayName } from '@/helpers/timeFormat'
import type { WeatherForecastResponse } from '@/types/forecast'
import type { DailyWeather } from '@/types/dailyWeather'

const props = defineProps<{
  lat: number
  lon: number
}>()

const forecast = ref<WeatherForecastResponse>()
const dailyWeather = ref<DailyWeather[]>([])

const fetchForecast = async () => {
  if (!props.lat || !props.lon) return

  try {
    forecast.value = await weatherService.getDailyForecast(props.lat, props.lon)
    dailyWeather.value = getDailyWeatherInfo(forecast.value.list).slice(1, -2)
  } catch (error) {
    console.error('Error fetching forecast:', error)
  }
}

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
  font-size: 0.9rem;
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
