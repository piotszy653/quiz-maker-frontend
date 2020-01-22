import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'

if (localStorage.getItem('access_token')) {
  axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
}

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'md'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
