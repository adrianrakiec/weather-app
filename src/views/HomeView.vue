<template>
  <a-layout-header class="header">
    <a-typography-title :level="2" class="title"> 🌤️Weather App </a-typography-title>
  </a-layout-header>

  <a-layout-content>
    <div class="content">
      <SearchBar @search="onSearch" />
      <a-button type="primary" @click="useCurrentLocation" class="location-btn">
        <EnvironmentOutlined />
      </a-button>
    </div>

    <ResultsList v-if="isResults" :data="results" />
    <a-skeleton active :loading="loading" />
  </a-layout-content>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { weatherService } from '@/services/weather.service'
import SearchBar from '@/components/SearchBar.vue'
import type { CityInfo } from '@/types/city'
import ResultsList from '@/components/ResultsList.vue'

const results = ref<CityInfo[]>([])
const loading = ref(false)
const isResults = computed(() => {
  return results.value.length > 0
})

function useCurrentLocation() {
  alert('Your location')
}

async function onSearch(cityName: string) {
  loading.value = true
  results.value = []
  results.value = await weatherService.getCoordinatesByCity(cityName)
  loading.value = false
}
</script>

<style scoped>
.header {
  text-align: center;
}

.title {
  padding: 1em;
}

.content {
  display: flex;
  gap: 0.1em;
  padding: 0 1em;
  margin-bottom: 2em;
}

.location-btn {
  height: auto;
}
</style>
