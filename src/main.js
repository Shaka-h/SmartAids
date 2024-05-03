import "@/assets/style.css";
import '@/assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'

import App from './App.vue'
import router from './router'
import mixins from "@/services/mixins.js";
import vuetify from './plugins/vuetify'
import '@vueup/vue-quill/dist/vue-quill.snow.css';



const app = createApp(App)

app.use(createPinia())
app.use(router)
.use(QuillEditor)
.use(vuetify)
.mixin(mixins)


app.mount('#app')
