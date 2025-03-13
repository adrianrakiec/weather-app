<template>
  <a-flex vertical gap="small">
    <a-flex justify="space-between">
      <a-typography-title :level="3" class="title">{{ selectedOption }}-day</a-typography-title>
      <a-select style="width: 120px" v-model:value="selectedOption">
        <a-select-option value="3">3-day</a-select-option>
        <a-select-option value="7">7-day</a-select-option>
        <a-select-option value="14">14-day</a-select-option>
      </a-select>
    </a-flex>
    <a-card>
      <a-flex justify="space-between" align="center">
        <a-typography-text>Monday</a-typography-text>
        <img :src="`/weather/01d.png`" alt="" style="width: 50px" />
        <a-typography-text>13° / 5°</a-typography-text>
      </a-flex>
    </a-card>
    <a-card>
      <a-flex justify="space-between" align="center">
        <a-typography-text>Tuesday</a-typography-text>
        <img :src="`/weather/02d.png`" alt="" style="width: 50px" />
        <a-typography-text>13° / 5°</a-typography-text>
      </a-flex>
    </a-card>
    <a-card>
      <a-flex justify="space-between" align="center">
        <a-typography-text>Wednesday</a-typography-text>
        <img :src="`/weather/03n.png`" alt="" style="width: 50px" />
        <a-typography-text>13° / 5°</a-typography-text>
      </a-flex>
    </a-card>
  </a-flex>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedOption = ref('3')
</script>
