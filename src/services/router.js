import Vue from 'vue'
import VueRouter from 'vue-router'
import Events from "../pages/Events";
import Calendar from "../pages/Calendar";
import Employees from "../pages/Employees";
import Employee from "../pages/Employee";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            component: Events,
            meta: {
                name: 'Events'
            }
        },
        {
            path: '/calendar',
            component: Calendar,
            meta: {
                name: 'Calendar'
            }
        },
        {
            path: '/employees',
            component: Employees,
            meta: {
                name: 'Employees'
            }
        },
        {
            path: '/employee/:id',
            component: Employee,
            meta: {
                name: 'Employee'
            }
        },
    ]
})
