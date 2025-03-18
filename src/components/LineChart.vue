<template>
  <Line :data="chartData" :options="chartOptions" />
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
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.3,
      pointRadius: 10,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>
