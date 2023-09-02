import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue'
import Login from './pages/Login.vue'
import RegisterVue from "./pages/Register.vue";
import Todos from "./pages/Todos.vue";
import CreateTodo from "./pages/CreateTodo.vue";
import InfoTodo from "./pages/InfoTodo.vue";
import EditTodo from "./pages/EditTodo.vue";



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
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: RegisterVue
        },
        {
            path: "/todos",
            name: "todos",
            component: Todos
        },
        {
            path: "/create-todo",
            name: "create-todo",
            component: CreateTodo
        },
        {
            path: "/info-todo/:slug",
            name: "info-todo",
            component: InfoTodo
        },
        {
            path: "/edit-todo/:slug",
            name: "edit-todo",
            component: EditTodo
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: () => import("./pages/NotFound.vue"),
        },
    ]
})

export { router };
