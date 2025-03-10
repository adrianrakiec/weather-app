<template>
  <transition name="fade">
    <a-alert
      v-if="notificationStore.message"
      :type="notificationStore.type"
      :message="notificationStore.message"
      closable
      @close="notificationStore.clearMessage"
      class="notification"
      show-icon
    />
  </transition>
</template>

<script setup lang="ts">
import { useNotificationStore } from '@/stores/useNotificationStore'

const notificationStore = useNotificationStore()
</script>

<style scoped>
.notification {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1em;
  width: 300px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
