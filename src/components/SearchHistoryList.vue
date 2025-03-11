<template>
  <div v-if="history.length" class="history-container">
    <a-typography-title :level="4" class="history-title">Recent searches</a-typography-title>
    <div class="history-list">
      <router-link
        v-for="entry in history"
        :key="`${entry.name}-${entry.lat}-${entry.lon}`"
        :to="`/weather?lat=${entry.lat}&lon=${entry.lon}`"
        class="history-item"
      >
        {{ entry.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SearchEntry } from '@/types/search'
import type { PropType } from 'vue'

defineProps({
  history: {
    type: Array as PropType<SearchEntry[]>,
    required: true,
  },
})
</script>

<style scoped>
.history-container {
  margin: 0 1em 2em;
}

.history-title {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.history-item {
  background-color: #1677ff;
  padding: 0.6em 1.2em;
  border-radius: 0.7em;
  text-decoration: none;
  color: #fff;
  transition: 0.3s ease;
  font-weight: 500;
  white-space: nowrap;
  font-size: 0.9rem;
}

.history-item:hover {
  background-color: #0056b3;
}
</style>
