<script>
import axios from "axios";
import { store } from "../store";
import { reactive, onMounted } from "vue";
import TodoList from "../components/TodoList.vue";
const state = reactive({
})




function openModal() {
    state.modal_demo.show()
}

function closeModal() {
    state.modal_demo.hide()
}

export default {
    name: "Todos",
    // props: ['modalMessage'],
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
            showModal: true,
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
        openModal() {
            this.showModal = true;
        },

    },
    mounted() {
        this.getTodos();
        // setTimeout(this.store.notification = '', 10000); // Chiudi il modal dopo 3 secondi
        setTimeout(() => {
            this.store.notification = '';
        }, 7000);

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
        <div v-if="store.notification" class=" bg-success-subtle border-success rounded notification">
            {{ store.notification }}
        </div>


    </template>
</template>
<style lang="scss">
.notification {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    // background-color: #333;
    // color: #fff;
    padding: 10px 20px;
    // border-radius: 5px;
    animation: notification 3s ease-in-out;
}

@keyframes notification {
    0% {
        top: -100px;
        opacity: 0;
    }

    20% {
        top: 20px;
        opacity: 1;
    }

    80% {
        top: 20px;
        opacity: 1;
    }

    100% {
        top: -100px;
        opacity: 0;
    }

}
</style>
