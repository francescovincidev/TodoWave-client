<script>
import axios from "axios";
import { store } from "../store";
// import { onMounted } from "vue";

export default {
    name: "TagDeleteModal",
    props: ['getTags', 'todos'],

    data() {
        return {
            store,
            tag_name: '',
            tag: null,
            errors: []

        }
    },
    methods: {

        upTag() {
            if (this.store.logged_id) {
                const payload = {
                    tag_name: this.tag_name,

                };

                let endpoint = '';
                if (this.tag) {
                    // Aggiungi il campo todo_id se this.todo è definito
                    payload.tag_id = this.tag.tag_id;
                    payload.user_id = this.store.logged_id;
                    endpoint = `/update`;
                } else {
                    // Aggiungi il campo user_id se this.todo non è definito
                    payload.user_id = this.store.logged_id;
                    endpoint = '/create';
                }

                axios({
                    method: this.tag ? 'PUT' : 'POST',
                    url: `${this.store.baseURL}/endpoints/tags_endpoints.php${endpoint}`,
                    data: payload,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        this.errors = [];

                        this.store.setNotification(response.data.message);

                        this.getTags;

                        // this.$router.push('/todos',);

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
        // this.errors = []



    }

}
</script>

<template>
    <button @click="errors = [], tag_name = ''" type="button" class="btn btn-danger" data-bs-toggle="modal"
        data-bs-target="#deleteTagModal" :disabled="store.tags.length = 0">
        Elimina Tag
    </button>
    <!-- Modal -->
    <div class="modal fade" id="adeleteTagModal" tabindex="-1" aria-labelledby="deleteTodoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteTodoModalLabel">{{ tag ? `Modifica il tag ${tag.tag_name} ` :
                        'Crea nuovo tag' }}
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="position-relative container">
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                    <button @click="upTag" type="button" class="btn btn-danger"
                        :data-bs-dismiss="tag_name.length <= 20 && tag_name.length > 0 && !errors.length ? 'modal' : null">TAG</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use "../style/partials/variables" as *;
@use "../style/general.scss" as *;
</style>
