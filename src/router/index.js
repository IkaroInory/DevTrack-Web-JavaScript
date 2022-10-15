import {createRouter, createWebHistory} from "vue-router"
import guards from "@/router/guards";

import HomeView from "@/views/HomeView";
import Login from "@/views/Login";
import Register from "@/views/Register"

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [...routes, ...guards]
})

export default router
