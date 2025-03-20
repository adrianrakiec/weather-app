<template>
  <div class="weather-container">
    <a-flex vertical align="center">
      <a-flex justify="center" align="center" class="current-time">
        <a-typography-text class="info-label">Local Time: </a-typography-text>
        <a-typography-text class="info-value">{{ localTime }}</a-typography-text>
      </a-flex>

      <a-popover trigger="hover" class="air-quality-btn" placement="bottomRight">
        <template #content>
          <a-typography-paragraph>
            Air Quality Index: {{ props.airQuality.list[0].main.aqi }} -
            <span :style="{ fontWeight: 'bold', color: aqiColor }">{{ aqiText }}</span>
          </a-typography-paragraph>
          <a-typography-text> </a-typography-text>
          <a-table
            :columns="aqiColumns"
            :data-source="aqiData"
            size="small"
            :pagination="false"
            bordered
          />

          <a-typography-title :level="5" style="margin-top: 0.2em">AQI Levels:</a-typography-title>
          <a-typography-paragraph>1 (Good) - 5 (Very Poor)</a-typography-paragraph>
        </template>
        <a-button shape="circle" size="large">?</a-button>
      </a-popover>

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
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { timeFormat } from '@/helpers/timeFormat'
import type { WeatherResponse } from '@/types/weather'
import type { AirQuality } from '@/types/airQuality'

interface BasicWeatherProps {
  data: WeatherResponse
  airQuality: AirQuality
}

const props = defineProps<BasicWeatherProps>()

const localTime = ref(timeFormat(Math.floor(Date.now() / 1000), props.data.timezone, true))

const aqiText = computed(() => {
  const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor']
  return aqiLevels[(props.airQuality.list[0].main.aqi || 1) - 1]
})

const aqiColor = computed(() => {
  const colors = ['#2ECC71', '#F1C40F', '#E67E22', '#E74C3C', '#8E44AD']
  return colors[(props.airQuality.list[0].main.aqi || 1) - 1]
})

const aqiColumns = [
  { title: 'Pollutant', dataIndex: 'component', key: 'component' },
  { title: 'Value (µg/m³)', dataIndex: 'value', key: 'value' },
]

const aqiData = computed(() => {
  const components = props.airQuality.list[0].components
  return (Object.keys(components) as Array<keyof typeof components>).map((key) => ({
    key,
    component: key.toUpperCase(),
    value: components[key],
  }))
})

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

.air-quality-btn {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1em;
  font-weight: bold;
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
