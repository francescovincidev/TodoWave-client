import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue'
// import Login from './pages/Login.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./pages/Login.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () => import("./pages/Register.vue")
        },
        {
            path: "/todos",
            name: "todos",
            component: () => import("./pages/Todos.vue")
        },
        {
            path: "/create-todo",
            name: "create-todo",
            component: () => import("./pages/CreateTodo.vue")
        },
        {
            path: "/info-todo/:slug",
            name: "info-todo",
            component: () => import("./pages/InfoTodo.vue"),
        },
        {
            path: "/edit-todo/:slug",
            name: "edit-todo",
            component: () => import("./pages/EditTodo.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("./pages/NotFound.vue"),
        },
    ]
})

export { router };
