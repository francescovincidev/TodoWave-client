<script>
import axios from "axios";
import { store } from "../store";
import { onMounted } from "vue";
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

                axios.post(`${this.store.baseURL}/endpoints/todos_endpoints.php/get`, {
                    user_id: this.store.logged_id

                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(response => {
                        console.log('Todos raccolti:', response.data);
                        const todos = response.data;
                        this.store.refreshTodos(todos);
                    })
                    .catch(error => {
                        // this.errors = [];
                        console.log('Errore durante il todos', error);

                        // this.errors = error.response.data.errors;
                    });
            }
        },
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

            <TodoList :getTodos="getTodos" />
        </template>
        <template v-else>
            <h2> Ciao {{ store.username }} non hai ancora Todo. Aggiungine qualcuno</h2>
        </template>
        <div>

            <router-link :to="{ name: 'create-todo' }" class="btn btn-primary"> Aggiungi todo </router-link>
        </div>
    </template>
</template>

<style >
.a {

    margin: 0 auto;
    /* width: 100%; */
}
</style>
