import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'

import App from './App.vue'
import router from './router'

import { useNotificationStore } from '@/stores/useNotificationStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.config.errorHandler = (err) => {
  const notificationStore = useNotificationStore()
  notificationStore.handleError(err)
}

app.mount('#app')
