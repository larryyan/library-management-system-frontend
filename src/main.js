import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

axios.defaults.baseURL = "https://127.0.0.1:5000/"
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

const app = createApp(App)

app
    .use(router)
    .mount('#app')

app.config.globalProperties.$axios = axios