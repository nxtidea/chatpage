import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'

import './assets/main.css'
import 'element-plus/dist/index.css'

import showdown from 'showdown'

const app = createApp(App)

app.use(router)

app.use(ElementPlus)
app.use(showdown)
app.mount('#app')