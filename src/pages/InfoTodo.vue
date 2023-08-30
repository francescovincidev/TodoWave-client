<script>
import axios from "axios";
import { store } from "../store";
// import { onMounted } from "vue";

export default {
    name: "InfoTodo",
    data() {
        return {
            store,
            todoID: null,
            todo: null

        }
    },
    methods: {
        deleteTodo() {
            axios.post(`${this.store.baseURL}/endpoints/todos_endpoints.php/delete`, {
                todo_id: this.todo.todo_id
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    this.errors = [];

                    console.log('Todo eliminato', response.data);
                    store.notification = 'Todo eliminato'

                    // this.store.todos = response.data
                    this.$router.push(`/todos`);
                })
                .catch(error => {
                    this.errors = [];
                    console.log('Errore durante l\'edit', error);
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }

                });
        }

    },
    mounted() {
        const todoId = this.$route.params.slug;
        this.todo = this.store.todos.activeTodos.find(todo => todo.todo_id == todoId) || this.store.todos.expiredTodos.find(todo => todo.todo_id == todoId) || null;



    }

}
</script>

<template>
    <template v-if="todo">
        <div class="info-container">

            <h2 class="text-center">
                {{ todo.title }}

            </h2>
            <div class="description rounded bg-light bg-opacity-50 p-3">

                {{ todo.description ? todo.description : 'Nessuna descrizione' }}
            </div>
            <div>

                Data di scadenza:
                {{ todo.deadline ? todo.deadline : 'Nessuna scadenza' }}
            </div>
            <div>
                Completato? {{ todo.completed ? 'Si' : 'No' }}
            </div>
            <div v-if="todo.upcomingExpiration && !todo.completed">
                ATTENZIONE SCADE ENTRO TRE GIORNI
            </div>
            <div v-if="todo.expired">
                Stato: {{ todo.completed ? 'Scaduto e completato' : 'Scaduto e non completato' }}
            </div>
            <router-link :to="{ name: 'edit-todo', params: { slug: todo.todo_id } }"
                class="btn btn-primary">EDIT</router-link>
            <div class="btn btn-danger" @click="deleteTodo">ELIMINA</div>
        </div>


    </template>
    <template v-else>
        <h2>ERRORE Non sei Loggato</h2>


    </template>
</template>

<style scoped lang="scss">
.info-container {
    width: 40%;
    margin: 0 auto;

    .description {
        max-height: 250px;
        overflow-y: auto;

        &::-webkit-scrollbar {
            display: none;

        }

    }
}
</style>
