import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faHeart, faTimes, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar)
library.add(faHeart)
library.add(faTimes)
library.add(faRedoAlt)

createApp(App).use(VueAxios, axios).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
