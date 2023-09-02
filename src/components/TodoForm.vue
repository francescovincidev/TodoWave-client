<script>
import axios from "axios";
import { store } from "../store";
// import { onMounted } from "vue";

export default {
    name: "TodoForm",

    data() {
        return {
            title: '',
            description: '',
            deadline: null,
            completed: false,
            errors: {},
            todo: null,
            selectedTags: [],
            // removedTags: [],
            store

        }
    },
    methods: {

        upTodo() {
            if (this.store.logged_id) {
                const payload = {
                    title: this.title,
                    description: this.description,
                    deadline: this.deadline ? this.deadline : 0,
                    completed: this.completed ? 1 : 0,
                    tags_add: this.selectedTags,
                    tags_remove: this.store.tags.filter(tag => !this.selectedTags.includes(tag.tag_id)).map(tag => tag.tag_id)
                };

                let endpoint = '';
                if (this.todo) {
                    // Aggiungi il campo todo_id se this.todo è definito
                    payload.todo_id = this.todo.todo_id;
                    payload.user_id = this.store.logged_id;
                    endpoint = `/update`;
                } else {
                    // Aggiungi il campo user_id se this.todo non è definito
                    payload.user_id = this.store.logged_id;
                    endpoint = '/create';
                }

                axios({
                    method: this.todo ? 'PUT' : 'POST',
                    url: `${this.store.baseURL}/endpoints/todos_endpoints.php${endpoint}`,
                    data: payload,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        this.errors = [];
                        // console.log(response.data);
                        this.store.setNotification(response.data.message);

                        this.$router.push('/todos',);

                    })
                    .catch(error => {
                        this.errors = [];
                        this.store.setError(error.response.data.error);

                        if (error.response) {
                            this.errors = error.response.data.errors;
                        }

                    });
            }


        }
    },
    mounted() {
        if (this.$route.params.slug) {

            const todoId = this.$route.params.slug;
            this.todo = this.store.todos.activeTodos.find(todo => todo.todo_id == todoId) || this.store.todos.expiredTodos.find(todo => todo.todo_id == todoId) || null;
            this.title = this.todo.title;
            this.description = this.todo.description;
            this.deadline = this.todo.deadline;
            this.completed = this.todo.completed ? true : false;
            this.selectedTags = this.todo.tags.map(tag => tag.tag_id);
        }
    }

}
</script>

<template>
    <template v-if="!store.logged_id">
        <h2>ERRORE Non sei Loggato</h2>
    </template>
    <template v-else>
        <div class="container infos">

            <h1 class="mt-4">{{ todo ? 'Modifica ' + todo.title : 'Crea un nuovo todo' }}</h1>
            <div class="center-container">

                <form @submit.prevent="upTodo" class=" center-form">


                    <div class="position-relative">
                        <label>Titolo</label>
                        <input type="text" class="form-control"
                            :class="errors && errors.titles && !errors.inputs ? 'is-invalid' : ''" v-model="title"
                            minlength="3" maxlength="100" required>
                        <template v-if="errors && !errors.inputs">
                            <div class="error-message invalid-feedback" role="alert" v-for="  title  in  errors.titles ">{{
                                title }}
                            </div>
                        </template>

                    </div>

                    <div class="position-relative">

                        <label>Descrizione</label>
                        <textarea class="form-control"
                            :class="errors && errors.descriptions && !errors.inputs ? 'is-invalid' : ''"
                            v-model="description" maxlength="1000" rows="4"></textarea>
                        <template v-if="errors && !errors.inputs">
                            <div class="error-message invalid-feedback" role="alert"
                                v-for=" description  in  errors.descriptions ">{{
                                    description }}</div>
                        </template>
                    </div>

                    <div class="position-relative">
                        <template class="d-flex align-items-center">
                            <span class="me-">

                                <label for="">Scadenza</label>
                                <input type="date" class="form-control"
                                    :class="errors && errors.deadlines && !errors.inputs ? 'is-invalid' : ''"
                                    v-model="deadline">
                                <template v-if="errors && !errors.inputs">
                                    <div class="error-message invalid-feedback" role="alert"
                                        v-for=" deadline  in  errors.deadlines ">{{
                                            deadline }}</div>
                                </template>
                            </span>
                            <div @click="deadline = ''" class="btn btn-primary ms-4">Resetta la data</div>
                        </template>


                    </div>

                    <div class="position-relative">
                        <label for="opzione">Todo già completata?:</label>
                        <input type="checkbox" id="completed"
                            :class="errors && errors.completeds && !errors.inputs ? 'is-invalid' : ''" name="completed"
                            v-model="completed">
                        <template v-if="errors && !errors.inputs">
                            <div class="error-message invalid-feedback" role="alert"
                                v-for=" completed  in  errors.completeds ">
                                {{ completed }}</div>
                        </template>
                    </div>

                    <div class="position-relative">
                        <label for="opzione">Seleziona i tag:</label>
                        <div class="row mx-auto">

                            <div class="col-6 form-check text-start" v-for="(tag, index) in store.tags" :key="tag.tag_id">

                                <input class="form-check-input" type="checkbox" :value="tag.tag_id"
                                    :id="'tag-check-' + tag.tag_id" v-model="selectedTags">
                                <label class=" form-check-label w-100" :for="'tag-check-' + tag.tag_id">{{ tag.tag_name
                                }}</label>

                            </div>
                        </div>
                    </div>



                    <template v-if="errors">
                        <div class="text-danger" v-for="   input    in    errors.inputs   ">{{ input }}</div>
                    </template>


                    <button type="submit" class=" btn btn-primary mt-3">{{ todo ? 'Modifica' : 'Crea' }}</button>
                </form>


            </div>
        </div>
    </template>
</template>

<style scoped lang="scss">
.form-check-label {
    // overflow-wrap: break-word;
    word-wrap: break-word;

}


.infos {
    max-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .center-form {
        text-align: center;
        display: flex;
        flex-direction: column;
        min-width: 140px;
        // width: 90%;

        .error-message {
            position: absolute;
            bottom: 0px;
            /* Posiziona l'errore sotto l'input */
            left: 0;
            font-size: 0.75rem;
            color: red;
            /* o il colore che preferisci */
        }

        input {
            margin-bottom: 20px;

        }

        textarea {
            margin-bottom: 20px;

            &::-webkit-scrollbar {
                display: none;
                /* Nasconde la scrollbar su browser basati su WebKit (Chrome, Safari, etc.) */
            }
        }

    }


}
</style>
