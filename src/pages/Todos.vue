<script>
import axios from "axios";
import { store } from "../store";
import { reactive, onMounted } from "vue";
import TodoList from "../components/TodoList.vue";
import TagModal from "../components/TagModal.vue";
import TagDeleteModal from "../components/TagDeleteModal.vue"
import NotLogged from "../components/NotLogged.vue";


export default {
    name: "Todos",
    components: {
        TodoList, TagModal, TagDeleteModal, NotLogged
    },
    data() {
        return {

            errors: [],
            selectedTag: {
                tag: null,
                activeTodos: [],
                expiredTodos: [],

            },
            store

        }
    },
    methods: {

        // PRENDIAMO I TODOS E LI MANDIAMO A REFRESH TODOS PER LA DIVISIONE In SCADUTI E ATTIVI
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

                        if (error.response) {
                            this.store.setError(error.response.data.error);
                            this.errors = error.response.data.errors;
                        }


                    });
            }
        },
        // PRENDIAMO I TAGS E LI CARICHIAMO NELLO STORE
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

                        this.store.tags = response.data;

                    })
                    .catch(error => {
                        this.store.setError(error.response.data.error);

                    });
            }

        },
        // LOGOUT
        logoutUser() {
            this.store.logged_id = null;
            this.store.username = null;
            this.store.todos.activeTodos = [];
            this.store.todos.expiredTodos = [];
            this.store.tags = [];
            this.store.setNotification('Logout eseguito');
        },

        // FILTRIMO I TODOS IN BASE AL TAG SCELTO
        filterTodos() {

            if (this.selectedTag.tag) {

                // FILTRIAMO I TODOS DELLO STORE CONTROLLANDO SE UNO DEI LORO TAG CORRISPONDE A QUELLO SELEZIONATO
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

        },

    },
    mounted() {
        this.getTodos();
        this.getTags();

    }


}
</script>

<template>
    <template v-if="!store.logged_id">
        <NotLogged />
    </template>
    <template v-else>

        <h3 class="ms-4 mt-4">{{ store.todos.activeTodos.length || store.todos.expiredTodos.length ||
            store.tags.length ?
            `Ben
            tornato ${store.username} ` : `Benvenuto ${store.username} non hai ancora Todo. Aggiungine qualcuno` }}</h3>
        <div class=" d-flex flex-column align-items-center">

            <h3 v-if="selectedTag.tag">{{ (selectedTag.activeTodos.length || selectedTag.expiredTodos.length) ?
                `Ecco i Todo filtrati per:
                ${selectedTag.tag.tag_name}` : `Nessun Todo con tag: ${selectedTag.tag.tag_name}` }}</h3>

            <!-- TAG ATTIVI E SCADUTI -->
            <template v-if="selectedTag.tag ? selectedTag.activeTodos.length : store.todos.activeTodos.length">
                <h2 class="mt-2">TODO ATTIVI</h2>
                <TodoList :getTodos="getTodos"
                    :todos="selectedTag.tag ? selectedTag.activeTodos : store.todos.activeTodos" />
            </template>
            <template v-if="selectedTag.tag ? selectedTag.expiredTodos.length : store.todos.expiredTodos.length">
                <h2 class="mt-2">TODO SCADUTI</h2>

                <TodoList :getTodos="getTodos"
                    :todos="selectedTag.tag ? selectedTag.expiredTodos : store.todos.expiredTodos" />
            </template>
        </div>



        <div class="dropdown position-fixed">
            <button class=" btn menu dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
            </button>

            <ul class="dropdown-menu ">
                <li class=" m-3"><router-link :to="{ name: 'create-todo' }" class=" create-todo btn btn-primary "
                        @click="getTags">
                        Aggiungi
                        Todo
                    </router-link></li>
                <li class="m-3"> <button type="button" class="btn btn-success " data-bs-toggle="modal"
                        data-bs-target="#addTagModal" :disabled="store.tags.length >= 10">
                        Aggiungi Tag
                    </button>
                </li>
                <li class="m-3"> <button type="button" class="btn btn-success " data-bs-toggle="modal"
                        data-bs-target="#deleteTagModal" :disabled="store.tags.length == 0">
                        Elimina Tag
                    </button>
                </li>
                <li class="m-3"> <router-link :to="{ name: 'home' }" class="logout btn btn-danger position-ixed"
                        @click="logoutUser">
                        Logout </router-link></li>


            </ul>

        </div>
        <TagModal :getTags="getTags" />
        <TagDeleteModal :getTags="getTags" />



        <div class="tag-filter text-center position-absolute">

            <label for="selectTag" class="text-center">Filtra per tag:</label>
            <select class="form-select" id="selectTag" aria-label="Example select with button addon"
                v-model="selectedTag.tag" @change="filterTodos">
                <option :value=null selected>Nessuno</option>
                <option v-for="(  tag, index  ) in   store.tags  " :key="tag.tag_id" :value="tag">{{ tag.tag_name }}
                </option>

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

}

.dropdown {
    left: 5%;
    bottom: 5%;
}

.menu {
    background-color: $font-primary;
    color: white;
}

h2 {
    font-size: 2rem;
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

}
</style>
