<script>
import axios from "axios";
import { store } from "../store";
// import { onMounted } from "vue";

export default {
    name: "EditTodo",
    data() {
        return {
            title: '',
            description: '',
            deadline: null,
            completed: false,
            errors: {},
            todo: null,
            store

        }
    },
    methods: {

        updateTodo() {
            if (this.store.logged_id) {
                axios.post(`${this.store.baseURL}/endpoints/todos_endpoints.php/update`, {
                    todo_id: this.todo.todo_id,
                    title: this.title,
                    description: this.description,
                    // Passiamo lo zero perchè il null non verrebbe preso e il false verrebe covnvertito in stringa, quindi vero
                    deadline: this.deadline ? this.deadline : 0,
                    completed: this.completed ? 1 : 0

                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(response => {
                        this.errors = [];

                        console.log('Todo aggiornato:', response.data);
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


        }
    },
    mounted() {
        const todoId = this.$route.params.slug;
        this.todo = this.store.todos.activeTodos.find(todo => todo.todo_id == todoId) || this.store.todos.expiredTodos.find(todo => todo.todo_id == todoId) || null;
        this.title = this.todo.title;
        this.description = this.todo.description;
        this.deadline = this.todo.deadline;
        this.completed = this.todo.completed ? true : false;


    }

}
</script>

<template>
    <template v-if="todo">
        <div class="center-container">

            <h1>ciao sono todos</h1>
            <form @submit.prevent="updateTodo" class="center-form">

                <label>Titolo</label>
                <input type="text" v-model="title" minlength="3" required>
                <template v-if="errors">
                    <div v-for="title in errors.titles">{{ title }}</div>
                </template>

                <label>Descrizione</label>
                <textarea v-model="description" maxlength="255"></textarea>
                <template v-if="errors">
                    <div v-for="description in errors.descriptions">{{ description }}</div>
                </template>

                <label for="">Scadenza</label>
                <input type="date" v-model="deadline">
                <div @click="deadline = ''">resetta la data</div>
                <template v-if="errors">
                    <div v-for="deadline in errors.deadlines">{{ deadline }}</div>
                </template>


                <label for="opzione">Todo già completata?:</label>
                <input type="checkbox" id="completed" name="completed" value="1" v-model="completed">

                <!-- <template v-if="errors">
                <div v-for="password in errors.passwords">{{ password }}</div>
            </template> -->

                <!-- <template v-if="errors">
                <div v-for="password in errors.inputs">{{ password }}</div>
            </template> -->


                <button type="submit">Daje carica il todo</button>
            </form>


        </div>
    </template>
    <template v-else>
        <h2>ERRORE Non sei Loggato</h2>
    </template>
</template>

<style >
.center-container {
    display: flex;
    justify-content: center;
    /* Centrare orizzontalmente */
    align-items: center;
    /* Centrare verticalmente */
    /* height: 100vh; */
    /* Altezza dello schermo */
}

.center-form {
    text-align: center;
    display: flex;
    flex-direction: column;

    /* Centrare gli elementi interni orizzontalmente */
}

input {
    margin-bottom: 20px;
}
</style>
