<template>
  <a-list size="large" bordered :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <router-link :to="`/weather?lat=${item.lat}&lon=${item.lon}`" class="city-item"
          >{{ item.name }}, {{ item.state }}, {{ item.country }}</router-link
        >
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
import type { CityInfo } from '@/types/city'

interface Props {
  data: CityInfo[]
}

defineProps<Props>()
</script>

<style scoped>
.city-item {
  color: inherit;
  padding: 0.3em;
  border-radius: 1em;
}

.city-item:focus {
  border: 1px solid #1677ff;
}
</style>
