import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'

import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'

import axios from 'axios'
import { DateTime } from 'luxon';

const app = createApp(App)

app.use(stores)
app.use(router)
app.use(i18n)
app.use(createVuestic({ config: vuesticGlobalConfig }))

if(import.meta.env.MODE == 'dev') {
  console.info('mode=dev')
}
axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

app.config.globalProperties.axios = axios
app.config.globalProperties.DateTime = DateTime

app.mount('#app')