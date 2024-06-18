import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

axios.default.baseURL = "https://127.0.0.1:5000/"

const app = createApp(App)

app
    .use(router)
    .mount('#app')

app.config.globalProperties.$axios = axios