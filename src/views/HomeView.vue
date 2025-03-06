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
  </a-layout-content>
</template>

<script setup lang="ts">
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { weatherService } from '@/services/weather.service'
import SearchBar from '@/components/SearchBar.vue'

function useCurrentLocation() {
  alert('Your location')
}

async function onSearch(cityName: string) {
  const results = await weatherService.getCoordinatesByCity(cityName)
  console.log(results)
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
}

.location-btn {
  height: auto;
}
</style>
