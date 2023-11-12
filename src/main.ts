import { createApp } from 'vue'
// tailwind
import './css/tailwind.css'

// Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



// Pinia
import pinia from './stores'

// VeeValidate
import veeValidate from "./plugins/vee-validate";

import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(veeValidate)
app.mount('#app')