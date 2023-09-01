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
            console.log(this.todo.todo_id)
            axios.delete(`${this.store.baseURL}/endpoints/todos_endpoints.php/delete`, {
                data: {
                    todo_id: this.todo.todo_id,
                    user_id: this.store.logged_id
                },

                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.errors = [];

                    this.store.setNotification(response.data.message);

                    this.$router.push(`/todos`);
                })
                .catch(error => {
                    this.errors = [];
                    this.store.setError(error.response.data.error);

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
            <!-- <div class="btn btn-danger" @click="deleteTodo">ELIMINA</div> -->

            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteTodoModal">
                ELIMINA
            </button>
            <!-- Modal -->
            <div class="modal fade" id="deleteTodoModal" tabindex="-1" aria-labelledby="deleteTodoModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="deleteTodoModalLabel">Sei sicuro di voler eliminare il Todo {{
                                todo.title }}?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Una volta eliminato non puoi recuperarlo
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                @click="deleteTodo">ELIMINA</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </template>
    <template v-else>
        <h2>ERRORE Non sei Loggato</h2>


    </template>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use "../style/partials/variables" as *;
@use "../style/general.scss" as *;



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
