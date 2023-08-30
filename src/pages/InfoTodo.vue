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
            <div class="rounded bg-light bg-opacity-50 p-3">

                {{ todo.description ? todo.description : 'Nessuna descrizione' }}
            </div>
            <div>

                Data di scadenza:
                {{ todo.deadline ? todo.deadline : 'Nessuna scadenza' }}
            </div>
            <div>
                Completato? {{ todo.completed ? 'Si' : 'No' }}
            </div>
            <div v-if="todo.upcomingExpiration">
                ATTENZIONE SCADE ENTRO TRE GIORNI
            </div>
            <div v-if="todo.expired">
                Stato: {{ todo.completed ? 'Scaduto e completato' : 'Scaduto e non completato' }}
            </div>
            <router-link :to="{ name: 'edit-todo', params: { slug: todo.todo_id } }">EDIT</router-link>
        </div>


    </template>
    <template v-else>
        <div>a</div>
        <h2>ERRORE Non sei Loggato</h2>


    </template>
</template>

<style >
.info-container {
    width: 40%;
    margin: 0 auto;
}
</style>
