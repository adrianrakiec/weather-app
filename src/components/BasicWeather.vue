<template>
  <div class="weather-container">
    <a-flex vertical align="center">
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

    <a-flex justify="space-between">
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
        <a-typography-text class="info-value">{{ timeFormat(data.sys.sunrise) }}</a-typography-text>
      </div>
      <div>
        <a-typography-text class="info-label">Sunset: </a-typography-text>
        <a-typography-text class="info-value">{{ timeFormat(data.sys.sunset) }}</a-typography-text>
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
import { timeFormat } from '@/helpers/timeFormat'
import type { WeatherResponse } from '@/types/weather'

interface BasicWeatherProps {
  data: WeatherResponse
}
defineProps<BasicWeatherProps>()
</script>

<style scoped>
.weather-container {
  padding: 1rem;
}

.weather-icon {
  width: clamp(20%, 10rem, 45%);
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0;
}

.info-label {
  font-weight: 600;
  color: #555;
}

.info-value {
  font-size: 1.1rem;
  font-weight: bold;
}

.sun-times {
  margin-top: 1rem;
}
</style>
