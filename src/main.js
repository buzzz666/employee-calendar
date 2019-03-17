import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './services/router'

Vue.config.productionTip = false

import {db} from './services/db'
db.ready()

new Vue({
  router,
  render: h => h(App),
  created(){
    this.$on('get-page', () => {
      this.$emit('change-page', this.currentPage)
    });
  }
}).$mount('#app')

router.replace('/')
