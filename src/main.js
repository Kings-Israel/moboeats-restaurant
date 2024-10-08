import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import './css/style.css'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import axiosIns from './api/axios'
import moment from 'moment'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

const EchoInstance = new Echo({
  broadcaster: 'pusher',
  key: "47XzIA.iorl8g",
  wsHost: 'realtime-pusher.ably.io',
  wsPort: 443,
  disableStats: true,
  encrypted: true,
  cluster: 'eu',
})

const app = createApp(App)

localStorage.setItem('vueuse-color-scheme', 'light')

app.use(router)
app.use(Toast)
app.use('moment', moment)
app.provide('$http', axiosIns)
app.provide('echo', EchoInstance)
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_MAPS_KEY,
    libraries: "places"
  },
})
app.mount('#app')
