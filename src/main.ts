import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'
import '@/assets/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Material,
  },
})
app.use(ToastService)

app.mount('#app')
