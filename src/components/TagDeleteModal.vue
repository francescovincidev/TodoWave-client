<script>
import axios from "axios";
import { store } from "../store";
// import { onMounted } from "vue";

export default {
    name: "TagDeleteModal",
    props: ['getTags', 'todos'],

    data() {
        return {
            tagsToDelete: [],
            store,

            errors: []

        }
    },
    methods: {
        deleteTags() {
            axios.delete(`${this.store.baseURL}/endpoints/tags_endpoints.php/delete`, {
                data: {
                    tag_ids: this.tagsToDelete,
                    user_id: this.store.logged_id
                },

                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.errors = [];
                    console.log(response.data);

                    this.store.setNotification(response.data.message);
                    this.getTags();


                    // this.$router.push(`/todos`);
                })
                .catch(error => {
                    this.errors = [];
                    this.store.setError(error.response.data.error);
                    console.log(error);
                    if (error.response) {
                        this.errors = error.response.data.errors;
                    }

                });
        }


    },


}
</script>

<template>
    <!-- Modal -->
    <div class="modal fade" id="deleteTagModal" tabindex="-1" aria-labelledby="deleteTodoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteTodoModalLabel"> ELIMINA I TAG
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="position-relative container">
                        <label for="opzione">Seleziona i tag:</label>
                        <div class="row mx-auto">

                            <div class="col-6 form-check text-start" v-for="(tag, index) in store.tags" :key="tag.tag_id">

                                <input class="form-check-input" type="checkbox" :value="tag.tag_id"
                                    :id="'tag-check-' + tag.tag_id" v-model="tagsToDelete">
                                <label class=" form-check-label w-100" :for="'tag-check-' + tag.tag_id">{{ tag.tag_name
                                }}</label>

                            </div>
                        </div>
                        <!-- <div v-for="tag in store.tags">{{ tag.tag_name }}</div> -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                    <button @click="deleteTags" type="button" class="btn btn-danger" data-bs-dismiss="modal">TAG</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use "../style/partials/variables" as *;
@use "../style/general.scss" as *;

.position-fixed {
    bottom: 3 0%;
    left: 3%
}
</style>
