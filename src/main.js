import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Contact from './components/Contact.vue'
import Summary from './components/Summary.vue'

Vue.use(VueRouter)
const routes = [
  { path: '/thanks', component: Summary },
  { path: '/', component: Contact },
  { path: '*', redirect: '/' }
]
const router = new VueRouter({
  routes
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
