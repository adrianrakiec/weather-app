import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref<string | null>(null)
  const type = ref<'success' | 'error' | null>(null)

  const clearMessage = () => {
    message.value = null
    type.value = null
  }

  const clearAfterTimeout = (timeout: number) => {
    setTimeout(clearMessage, timeout)
  }

  const showSuccess = (msg: string, timeout = 2000) => {
    message.value = msg
    type.value = 'success'
    clearAfterTimeout(timeout)
  }

  const showError = (msg: string, timeout = 2000) => {
    message.value = msg
    type.value = 'error'
    clearAfterTimeout(timeout)
  }

  const handleError = (error: unknown, timeout = 2000) => {
    let errorMessage = 'Unexpected error occurred'

    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }

    showError(errorMessage, timeout)
  }

  return { message, type, clearMessage, showSuccess, handleError }
})
