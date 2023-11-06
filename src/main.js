import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-Validate/dist/locale/zh_TW'

import App from './App'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

VeeValidate.Validator.localize('zh_TW', zhTWValidate) 
Vue.use(VeeValidate)

axios.defaults.withCredentials = true;

// Vue.component('Loading',Loading)
Vue.filter('currency', currencyFilter)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})

router.beforeEach((to, from, next) => {
  // console.log('to ', to, 'from',from,'next',next)
  if(to.meta.requiresAuth) {
    // console.log('需要驗證')
    const api = `${process.env.APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      console.log(response.data)
      if(response.data.success) {
        next()
      }else {
        next({
          path: '/Login'
        })
      }
    })
  }else{
    next()
  }  
})