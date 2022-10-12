import {createRouter, createWebHistory} from "vue-router"
import guards from "@/router/guards";

import HomeView from "@/views/HomeView";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [...routes, ...guards]
})

export default router
