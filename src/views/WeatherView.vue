<template>
  <a-layout-header class="header">
    <a-flex align="center" justify="space-between"
      ><a-typography-title :level="3" class="title"> Białystok </a-typography-title>
      <a-button><PlusCircleOutlined /></a-button
    ></a-flex>
  </a-layout-header>

  <a-layout-content>
    <a-flex vertical align="center">
      <img src="/weather/01d.png" alt="weather icon" class="weather-icon" />
      <a-typography-paragraph class="temperature"> 12°</a-typography-paragraph>
      <a-flex gap="large">
        <a-typography-paragraph> Sunrise: 6.40</a-typography-paragraph>
        <a-typography-paragraph> Sunset: 17.49</a-typography-paragraph>
      </a-flex>
    </a-flex>
  </a-layout-content>
</template>

<script setup lang="ts">
import { PlusCircleOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.title {
  padding: 1em 1em 0 1em;
  font-size: 2.5rem;
  text-align: center;
}

.weather-icon {
  width: clamp(20%, 10rem, 45%);
}

.temperature {
  margin-top: 0.5em;
  font-size: 3rem;
}
</style>
