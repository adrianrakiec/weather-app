<template>
  <div class="weather-container">
    <a-flex vertical align="center">
      <a-flex justify="center" align="center" class="current-time">
        <a-typography-text class="info-label">Local Time: </a-typography-text>
        <a-typography-text class="info-value">{{ localTime }}</a-typography-text>
      </a-flex>

      <img
        :src="`/weather/${data.weather[0].icon}.png`"
        :alt="data.weather[0].main"
        class="weather-icon"
      />

      <a-typography-paragraph class="temperature">
        {{ Math.round(data.main.temp) }}°
      </a-typography-paragraph>
    </a-flex>

    <a-divider />

    <a-flex justify="space-between" style="text-align: center">
      <div>
        <a-typography-text class="info-label">Humidity: </a-typography-text>
        <a-typography-text class="info-value">{{ data.main.humidity }}%</a-typography-text>
      </div>
      <div>
        <a-typography-text class="info-label">Pressure: </a-typography-text>
        <a-typography-text class="info-value">{{ data.main.pressure }}hPa</a-typography-text>
      </div>
      <div>
        <a-typography-text class="info-label">Wind Speed: </a-typography-text>
        <a-typography-text class="info-value">{{ data.wind.speed }}m/s</a-typography-text>
      </div>
    </a-flex>

    <a-divider />

    <a-flex justify="space-around" class="sun-times">
      <div>
        <a-typography-text class="info-label">Sunrise: </a-typography-text>
        <a-typography-text class="info-value">{{
          timeFormat(data.sys.sunrise, data.timezone)
        }}</a-typography-text>
      </div>
      <div>
        <a-typography-text class="info-label">Sunset: </a-typography-text>
        <a-typography-text class="info-value">{{
          timeFormat(data.sys.sunset, data.timezone)
        }}</a-typography-text>
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { timeFormat } from '@/helpers/timeFormat'
import type { WeatherResponse } from '@/types/weather'

interface BasicWeatherProps {
  data: WeatherResponse
}

const props = defineProps<BasicWeatherProps>()

const localTime = ref(timeFormat(Math.floor(Date.now() / 1000), props.data.timezone, true))

let intervalId: number

onMounted(() => {
  intervalId = setInterval(() => {
    localTime.value = timeFormat(Math.floor(Date.now() / 1000), props.data.timezone, true)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.weather-container {
  padding: 0 1rem;
}

.weather-icon {
  width: clamp(20%, 10rem, 45%);
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0;
}

.current-time {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  background: #f0f0f0;
  padding: 0.5em 1em;
  margin-bottom: 1em;
}

.info-label {
  font-weight: 600;
  color: #555;
}

.info-value {
  font-size: 1.1rem;
  font-weight: bold;
  margin-left: 0.3em;
}

.sun-times {
  margin-top: 1rem;
}
</style>
