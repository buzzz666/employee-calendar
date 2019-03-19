import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './services/router'

Vue.config.productionTip = false

import {db} from './services/db'
db.ready()

const app = new Vue({
  router,
  render: h => h(App),
  data(){
    return {
      currentPage: 'Events',
    };
  },
  created(){
    this.$on('get-page', () => {
      this.$emit('change-page', this.currentPage)
    });
  }
}).$mount('#app')

router.replace('/')
router.beforeEach((to, from, next) => {
  app.$emit('change-page', to.meta.name);
  document.title = to.meta.name;
  next();
});