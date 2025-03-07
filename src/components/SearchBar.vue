<template>
  <a-auto-complete
    v-model:value="search"
    :options="cityOptions"
    @search="debouncedFetchCities"
    placeholder="Search city..."
    size="large"
    class="search-input"
  />
  <a-button @click="onClick" class="search-btn"><SearchOutlined /></a-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import debounce from 'lodash.debounce'
import { SearchOutlined } from '@ant-design/icons-vue'
import { weatherService } from '@/services/weather.service'

const emit = defineEmits(['search'])
const search = ref('')
const cityOptions = ref<{ value: string; label: string; key: string }[]>([])
const isFetchCanceled = ref(false)

const fetchCities = async (query: string) => {
  if (!query) return

  try {
    const data = await weatherService.getCoordinatesByCity(query)

    if (isFetchCanceled.value) return

    cityOptions.value = data.map((city) => ({
      value: `${city.name}, ${city.state}, ${city.country}`,
      label: `${city.name}, ${city.state}, ${city.country}`,
      key: `${city.name}${Math.random()}`,
    }))
  } catch (error) {
    console.error('Error fetching cities:', error)
  } finally {
    isFetchCanceled.value = false
  }
}

const debouncedFetchCities = debounce(fetchCities, 600)

function onClick() {
  emit('search', search.value)
  search.value = ''
  cityOptions.value = []
  isFetchCanceled.value = true
}
</script>

<style scoped>
.search-input {
  width: 100%;
}

.search-btn {
  height: auto;
}
</style>
