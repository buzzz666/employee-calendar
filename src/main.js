// Plugins indexes
import './plugins/vuetify'
import './plugins/moment'

// Import main modules
import Vue from 'vue'
import App from './App.vue'
import router from './services/router'

// Init database before app create
import {db} from './services/db'
db.ready()

// Main app
const app = new Vue({
  router,
  render: h => h(App),
  data(){
    return {
      currentPage: 'Calendar',
    };
  },
  created(){
    this.$on('get-page', () => {
      this.$emit('change-page', this.currentPage)
    });
  }
}).$mount('#app')

// Router start location
router.replace('/calendar')

// Extracts page name from route meta and emitting event to change toolbar title
router.beforeEach((to, from, next) => {
  app.$emit('change-page', to.meta.name);
  document.title = to.meta.name;
  next();
});