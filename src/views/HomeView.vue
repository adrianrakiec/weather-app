<template>
  <a-layout-header class="header">
    <a-typography-title :level="2" class="title"> 🌤️Weather App </a-typography-title>
  </a-layout-header>

  <a-layout-content>
    <div class="content">
      <a-auto-complete v-model:value="search" placeholder="Search city..." class="search-input" />
      <a-button><SearchOutlined /></a-button>
      <a-button type="primary" @click="useCurrentLocation">
        <EnvironmentOutlined />
      </a-button>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const search = ref('')

function useCurrentLocation() {
  alert('Your location')
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
</style>
