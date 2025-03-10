<script setup lang="ts">
import SavedLocationsDrawer from '@/components/SavedLocationsDrawer.vue'
import GlobalNotification from '@/components/GlobalNotification.vue'
</script>

<template>
  <RouterView />
  <SavedLocationsDrawer />
  <GlobalNotification />
</template>

<style scoped></style>
