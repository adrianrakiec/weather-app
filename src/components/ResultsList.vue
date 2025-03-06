<template>
  <a-list size="large" bordered :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <router-link :to="item.name" class="city-item"
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
}
</style>
