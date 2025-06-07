import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

const apiBaseUrl = '/api';
axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$apiBaseUrl = apiBaseUrl;

app
    .use(router)
    .mount('#app')

