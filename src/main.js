import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './localisation'
import { PrimeVue } from '@primevue/core'
import ToggleSwitch from 'primevue/toggleswitch'
import Aura from '@primeuix/themes/aura'
import { pinia } from './store/pinia-instance'

createApp(App).use(i18n).use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
.use(pinia)
.component('ToggleSwitch', ToggleSwitch).mount('#app')
