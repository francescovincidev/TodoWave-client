<script>
import axios from "axios";
import { store } from "../store";


export default {
    name: "TodoList",
    props: ['getTodos', 'todos'],

    data() {
        return {
            store
        }
    },
    methods: {
        //Si assicura che il click non avvenga su router-link
        handleLiClick(todo) {
            if (!event.target.closest('a')) {
                this.updateCompleted(todo);
            }
        },
        //Aggiorna il completed al click
        updateCompleted(todo) {

            if (this.store.logged_id) {
                axios.put(`${this.store.baseURL}/endpoints/todos_endpoints.php/update_completed`, {
                    user_id: this.store.logged_id,
                    todo_id: todo.todo_id,
                    completed: !todo.completed ? 1 : 0

                }, {
                    headers: {
                        'Content-Type': 'application/json'

                    }
                })
                    .then(response => {
                        this.errors = [];
                        this.getTodos();
                    })
                    .catch(error => {
                        this.errors = [];


                        if (error.response) {
                            this.store.setError(error.response.data.error);
                            this.errors = error.response.data.errors;
                        }

                    });
            }
        }

    }

}
</script>

<template>
    <template v-if="!store.logged_id">
        <h2>ERRORE Non sei Loggato</h2>
    </template>
    <template v-else>


        <template v-if="todos.length > 0">
            <ul class="list-group list">
                <template v-for="todo in todos" :key="todo.todo_id">
                    <li @click="handleLiClick(todo)" class="list-group-item"
                        :class="todo.expired ? (todo.completed ? 'completed' : 'expired') : (todo.completed ? 'completed' : 'incompleted')">
                        <span class="d-flex justify-content-between w-100">
                            <span class="title text-break">{{ todo.title }}</span>
                            <span class="text-end">
                                <i v-if="!todo.completed && todo.upcomingExpiration"
                                    class="fa-solid fa-triangle-exclamation" style="color: rgb(255, 234, 0);"></i>
                                <i v-if="!todo.completed && todo.expired" class="fa-solid fa-circle-exclamation"
                                    style="color: red;"></i>
                                <router-link :to="{ name: 'info-todo', params: { slug: todo.todo_id } }" class="ms-2">
                                    <i class="fa-solid fa-circle-info"></i>
                                </router-link>
                            </span>
                        </span>
                    </li>
                </template>
            </ul>
        </template>
    </template>
</template>

<style  scoped lang="scss">
.list {

    width: 40%;
    max-height: 250px;
    overflow-y: auto;

    .title {
        width: 90%;
    }

}

.list::-webkit-scrollbar {
    display: none;
    /* Nasconde la scrollbar su browser basati su WebKit (Chrome, Safari, etc.) */
}

.incompleted {
    background-color: #90d890;
}

.completed {
    background-color: #d1d1d1;
    text-decoration: line-through;
}

.expired {
    background-color: #ff9090;
}
</style>
