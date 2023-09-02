<script>
import axios from "axios";
import { store } from "../store";
import { reactive, onMounted } from "vue";
import TodoList from "../components/TodoList.vue";
import TagModal from "../components/TagModal.vue";
import TagDeleteModal from "../components/TagDeleteModal.vue"


export default {
    name: "Todos",
    components: {
        TodoList, TagModal, TagDeleteModal
    },
    data() {
        return {
            email: '',
            password: '',
            username: '',
            passwordRepeat: '',
            errors: [],
            selectedTag: {
                tag: null,
                activeTodos: [],
                expiredTodos: [],

            },
            // upcomingExpirationCount: null,
            store

        }
    },
    methods: {

        getTodos(tag_id = null) {
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

                        this.store.refreshTodos(todos, tag_id);
                    })
                    .catch(error => {
                        this.store.setError(error.response.data.error);


                    });
            }
        },
        getTags() {
            if (this.store.logged_id) {
                this.store.tags = [];
                axios.get(`${this.store.baseURL}/endpoints/tags_endpoints.php/get`, {
                    params: {
                        user_id: this.store.logged_id
                    },
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        console.log('Tags raccolti:', response.data);
                        this.store.tags = response.data;
                        console.log(response.data);
                        // const todos = response.data;

                        // this.store.refreshTodos(todos);
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
            this.store.tags = [];
            this.store.setNotification('Logout eseguito');

            // store.notification = 'Logout eseguito'

        },
        filterTodos() {


            if (this.selectedTag.tag) {
                // this.getTodos()
                // Se nessun tag è selezionato, mostra tutti i todo
                // Altrimenti, filtra i todo per il tag selezionato
                this.selectedTag.activeTodos = this.store.todos.activeTodos.filter(todo => {
                    return todo.tags.some(tag => tag.tag_id === this.selectedTag.tag.tag_id);
                });
                this.selectedTag.expiredTodos = this.store.todos.expiredTodos.filter(todo => {
                    return todo.tags.some(tag => tag.tag_id === this.selectedTag.tag.tag_id);
                });

            } else {
                this.selectedTag.activeTodos = [];
                this.selectedTag.expiredTodos = [];

            }
            // this.getTodos()


        },

    },
    mounted() {
        this.getTodos();
        this.getTags();

        // this.upcomingExpirationCount = this.store.todos.activeTodos.filter(todo => todo.upcomingExpiration).length;
    }


}
</script>

<template>
    <template v-if="!store.logged_id">
        <h2>ERRORE Non sei Loggato</h2>
    </template>
    <template v-else>

        <h3>{{ store.todos.activeTodos.length > 0 || store.todos.expiredTodos.length > 0 || store.tags ? `Ben
            tornato ${store.username} ` : `Benvenuto ${store.username} non hai ancora Todo. Aggiungine qualcuno` }}</h3>
        <div class="d-flex flex-column align-items-center">

            <h3 v-if="selectedTag.tag">{{ (selectedTag.activeTodos.length > 0 || selectedTag.expiredTodos.length > 0) ?
                `Ecco i Todo filtrati per:
                ${selectedTag.tag.tag_name}` : `Nessun Todo con tag: ${selectedTag.tag.tag_name}` }}</h3>

            <template v-if="selectedTag.tag ? selectedTag.activeTodos.length > 0 : store.todos.activeTodos.length > 0">
                <h2 class="mt-2">TODO ATTIVI</h2>
                <TodoList :getTodos="getTodos"
                    :todos="selectedTag.tag ? selectedTag.activeTodos : store.todos.activeTodos" />
            </template>
            <template v-if="selectedTag.tag ? selectedTag.expiredTodos.length > 0 : store.todos.expiredTodos.length > 0">
                <h2 class="mt-2">TODO SCADUTI</h2>

                <TodoList :getTodos="getTodos"
                    :todos="selectedTag.tag ? selectedTag.expiredTodos : store.todos.expiredTodos" />
            </template>
        </div>



        <div class="dropdown position-fixed">
            <button class="btn menu dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
            </button>
            <ul class="dropdown-menu">
                <li class="m-3"><router-link :to="{ name: 'create-todo' }"
                        class=" create-todo btn btn-primary position-fied" @click="getTags">
                        Aggiungi
                        Todo
                    </router-link></li>
                <li class="m-3"> <button type="button" class="btn btn-success position-ixed" data-bs-toggle="modal"
                        data-bs-target="#addTagModal" :disabled="store.tags.length >= 10">
                        Aggiungi Tag
                    </button>
                </li>
                <li class="m-3"> <button type="button" class="btn btn-success positio-fixed" data-bs-toggle="modal"
                        data-bs-target="#deleteTagModal" :disabled="store.tags.length == 0">
                        Elimina Tag
                    </button>
                </li>
                <li class="m-3"> <router-link :to="{ name: 'home' }" class="logout btn btn-danger position-ixed"
                        @click="logoutUser">
                        Logout </router-link></li>

                <!-- <li><a class="dropdown-item" href="#">Something else here</a></li> -->
            </ul>
        </div>
        <TagModal :getTags="getTags" />
        <TagDeleteModal :getTags="getTags" />

        <div>


        </div>

        <div>


        </div>












        <div class="tag-filter text-center position-absolute">

            <label for="selectTag" class="text-center">Filtra per tag:</label>
            <select class="form-select" id="selectTag" aria-label="Example select with button addon"
                v-model="selectedTag.tag" @change="filterTodos">
                <option :value=null selected>Nessuno</option>
                <option v-for="(tag, index) in store.tags" :key="tag.tag_id" :value="tag">{{ tag.tag_name }}</option>

            </select>
        </div>

        <div v-if="store.upcomingExpirationCount" class=" text-center bg-danger-subtle border-danger rounded notification">
            <div><i class="fa-solid fa-triangle-exclamation" style="color: red;"></i> <i
                    class="fa-solid fa-triangle-exclamation" style="color: red;"></i> <i
                    class="fa-solid fa-triangle-exclamation" style="color: red;"></i></div>
            <span style="white-space: nowrap;">

                Hai ({{ store.upcomingExpirationCount }}) Todo che scadono entro 3 giorni!!!
            </span>
            <div>
                <i class="fa-solid fa-triangle-exclamation" style="color: red;"></i> <i
                    class="fa-solid fa-triangle-exclamation" style="color: red;"></i> <i
                    class="fa-solid fa-triangle-exclamation" style="color: red;"></i>
            </div>
        </div>
    </template>
</template>
<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use "../style/partials/variables" as *;
@use "../style/general.scss" as *;

.dropdown-menu {
    background-color: #ffffff00;
    border: none;
    /* Cambia il colore di sfondo come desideri */
    /* Altri stili desiderati per il menu a discesa */
}

.dropdown {
    left: 3%;
    bottom: 5%;
}

.menu {
    background-color: $font-primary;
    color: white;
}

h2 {
    font-size: 2rem;
}

.logout {
    bottom: 10%;
    left: 3%
}

.create-todo {
    bottom: 20%;
    left: 3%;
}



.tag-filter {
    top: 20%;
    right: 5%;
    width: 15%
}

.notification {
    @include animated_upcoming_expiration;

    span {
        white-space: nowrap;
    }

    // left: 75%;
}
</style>
