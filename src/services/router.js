import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../pages/Home";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                name: 'Events'
            }
        },
    ]
})
