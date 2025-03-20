<template>
  <a-drawer v-model:open="isOpen" title="Saved Locations" placement="right" width="300">
    <a-flex vertical gap="small">
      <template v-if="savedWeatherStore.savedWeather.length">
        <a-card
          v-for="location in savedWeatherStore.savedWeather"
          :key="location.lat + location.lon"
          class="location-card"
          @click="goToWeather(location)"
        >
          <a-flex justify="space-between" align="center">
            <div>
              <strong>{{ location.name }}</strong>
            </div>
            <a-button type="text" danger @click.stop="removeLocation(location)">
              <DeleteOutlined />
            </a-button>
          </a-flex>
        </a-card>
      </template>
      <a-empty v-else description="No saved locations" />
    </a-flex>
  </a-drawer>

  <a-float-button
    type="primary"
    class="float-btn"
    @click="isOpen = true"
    :badge="{ count: savedWeatherStore.savedWeather.length }"
  >
    <HeartOutlined />
  </a-float-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useSavedWeatherStore } from '@/stores/useSavedWeatherStore'
import type { SearchEntry } from '@/types/search'

const router = useRouter()
const savedWeatherStore = useSavedWeatherStore()
const isOpen = ref(false)

const goToWeather = (location: SearchEntry) => {
  router.push({ path: '/weather', query: { lat: location.lat, lon: location.lon } })
  isOpen.value = false
}

const removeLocation = (location: SearchEntry) => {
  savedWeatherStore.removeSavedWeather(location)
}
</script>

<style scoped>
.float-btn {
  bottom: 1.2em;
  right: 1.2em;
}

.location-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.location-card:hover {
  transform: scale(1.05);
}
</style>
