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

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify2 = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

app.use(vuetify2)
app.use(createPinia())
app.use(router)
.use(QuillEditor)
.use(vuetify)
.mixin(mixins)


app.mount('#app')
