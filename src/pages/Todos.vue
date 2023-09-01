<script>
import axios from "axios";
import { store } from "../store";
import { reactive, onMounted } from "vue";
import TodoList from "../components/TodoList.vue";

export default {
    name: "Todos",
    components: {
        TodoList
    },
    data() {
        return {
            email: '',
            password: '',
            username: '',
            passwordRepeat: '',
            errors: {},
            store

        }
    },
    methods: {
        getTodos() {
            if (this.store.logged_id) {

                axios.get(`${this.store.baseURL}/endpoints/todos_endpoints.php/get`, {
                    params: {
                        user_id: this.store.logged_id
                    },
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        console.log('Todos raccolti:', response.data);
                        const todos = response.data;

                        this.store.refreshTodos(todos);
                    })
                    .catch(error => {
                        this.store.setError(error.response.data.error);


                    });
            }
        },
        logoutUser() {
            this.store.logged_id = null;
            this.store.username = null;
            this.store.todos.activeTodos = [];
            this.store.todos.expiredTodos = [];
            this.store.setNotification('Logout eseguito');

            // store.notification = 'Logout eseguito'

        }

    },
    mounted() {
        this.getTodos();
    }


}
</script>

<template>
    <template v-if="!store.logged_id">
        <h2>ERRORE Non sei Loggato</h2>
    </template>
    <template v-else>
        <template v-if="store.todos.activeTodos.length > 0 || store.todos.expiredTodos.length > 0">
            <h2>Ben tornato {{ store.username }} </h2>
            <div class="d-flex flex-column align-items-center">
                <template v-if="store.todos.activeTodos.length > 0">
                    <h1>TODO ATTIVI</h1>
                    <TodoList :getTodos="getTodos" :todos="store.todos.activeTodos" />
                </template>
                <template v-if="store.todos.expiredTodos.length > 0">
                    <h1 class="mt-1">TODO SCADUTI</h1>

                    <TodoList :getTodos="getTodos" :todos="store.todos.expiredTodos" />
                </template>
            </div>
        </template>

        <template v-else>
            <h2> Ciao {{ store.username }} non hai ancora Todo. Aggiungine qualcuno</h2>
        </template>
        <div>

            <router-link :to="{ name: 'create-todo' }" class="btn btn-primary"> Aggiungi todo </router-link>
        </div>

        <div>
            <router-link :to="{ name: 'home' }" class="btn btn-primary" @click="logoutUser">
                Logout </router-link>

        </div>



    </template>
</template>
<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use "../style/partials/variables" as *;
@use "../style/general.scss" as *;

.notification {
    @include animated_notification;
}
</style>
