<script>
import axios from "axios";
import { store } from "../store";
// import { onMounted } from "vue";

export default {
    name: "TagModal",
    props: ['getTags'],

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
                axios.post(`${this.store.baseURL}/endpoints/tags_endpoints.php/create`, {
                    tag_name: this.tag_name,
                    user_id: this.store.logged_id,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        this.errors = [];

                        this.store.setNotification(response.data.message);

                        this.getTags();
                        this.tag_name = '';

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
    <!-- Modal -->
    <div class="modal fade" id="addTagModal" tabindex="-1" aria-labelledby="deleteTodoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteTodoModalLabel">
                        Crea nuovo tag
                    </h1>
                    <button type="button" class="btn-close" @click="errors = [], tag_name = ''" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="position-relative">
                        <label>Nome tag</label>
                        <input type="text" class="form-control"
                            :class="errors && errors.tag_names && !errors.inputs ? 'is-invalid' : ''" v-model="tag_name"
                            minlength="3" maxlength="100" required>
                        <template v-if="errors && !errors.inputs">
                            <div class="error-message invalid-feedback" role="alert"
                                v-for="     title     in     errors.tag_names    ">
                                {{
                                    title }}
                            </div>
                        </template>

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="errors = [], tag_name = ''"
                        data-bs-dismiss="modal">Chiudi</button>
                    <button @click="upTag" type="button" class="btn btn-danger"
                        :data-bs-dismiss="tag_name.length <= 20 && tag_name.length > 0 && store.tags.length < 10 ? 'modal' : null">TAG</button>
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
