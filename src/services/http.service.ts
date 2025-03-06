import axios from 'axios'

const http = axios.create({
  params: {
    appid: import.meta.env.VITE_API_KEY,
  },
})

export { http }
