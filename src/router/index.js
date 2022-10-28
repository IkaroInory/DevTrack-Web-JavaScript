import {createRouter, createWebHistory} from "vue-router"
import guards from "@/router/guards";

import Login from "@/views/Login";
import Register from "@/views/Register"
import Home from "@/views/Home"
import Workbench from "@/views/HomeChildren/Workbench";
import Project from "@/views/HomeChildren/Project";
import Plus from "@/views/HomeChildren/Plus";
import Search from "@/views/HomeChildren/Search";
import Message from "@/views/HomeChildren/Message";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        children: [
            {path: '/workbench', component: Workbench},
            {path: '/project', component: Project},
            {path: '/plus', component: Plus},
            {path: '/search', component: Search},
            {path: '/message', component: Message}
        ]
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
