<template>
  <a-auto-complete
    v-model:value="search"
    placeholder="Search city..."
    class="search-input"
  />
  <a-button @click="onClick"><SearchOutlined /></a-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'

const emit = defineEmits(['search'])
const search = ref('')

function onClick() {
  emit('search', search.value)
  search.value = ''
}
</script>

<style scoped>
.search-input {
  width: 100%;
}
</style>
