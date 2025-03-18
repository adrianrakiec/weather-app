<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
  </div>
  <a-flex justify="space-between" align="center" style="padding-left: 0.7em">
    <img
      v-for="{ icon, time } in props.temperatures"
      :key="time"
      :src="`/weather/${icon}.png`"
      :alt="`Weather icon for: ${time}`"
      class="weather-icon"
    />
  </a-flex>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip)

const props = defineProps<{
  temperatures: {
    time: string
    temperature: number
    icon: string
  }[]
}>()

const chartData = computed(() => ({
  labels: props.temperatures.map((t) => t.time),
  datasets: [
    {
      data: props.temperatures.map((t) => Math.round(t.temperature)),
      borderColor: '#ff6384',
      backgroundColor: '#ff6384',
      tension: 0.3,
      pointRadius: 5,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      suggestedMin: 0,
      grid: {
        color: (context: { tick: { value: number } }) =>
          context.tick.value === 0 ? '#000' : '#fff',
      },
    },
  },
}
</script>

<style scoped>
.weather-icon {
  width: 30px;
}
</style>
