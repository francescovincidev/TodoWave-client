<script>
import axios from "axios";
import { store } from "../store";
export default {
    name: "Login",
    data() {
        return {
            email: '',
            password: '',
            errors: [],
            store

        }
    },
    methods: {
        loginUser() {
            axios.post(`${this.store.baseURL}/endpoints/user_endpoints.php/login`, {
                email: this.email,
                password: this.password,

            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    this.errors = [];
                    this.store.logged_id = response.data.logged_id;
                    this.store.username = response.data.username;
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
    }

}
</script>

<template>
    <div class="container credentials">
        <!-- TITOLO -->
        <h1 class="mt-4">TodoWave</h1>

        <p class="text-center">
            Effettua il login per recuperare la tua todo
        </p>

        <!-- FORM -->
        <form @submit.prevent="loginUser" class="center-form">
            <div class="position-relative">
                <label>Email:</label>
                <input type="email" class="form-control"
                    :class="errors && errors.emails && !errors.inputs ? 'is-invalid' : ''" v-model="email" required>
                <template v-if="errors && !errors.inputs">
                    <div class="position-absolute start-50 translate-middle invalid-feedback" role="alert"
                        v-for="email in errors.emails">{{ email }}</div>
                </template>
            </div>

            <div class="position-relative">

                <label>Password:</label>
                <input type="password" class="form-control"
                    :class="errors && errors.passwords && !errors.inputs ? 'is-invalid' : ''" v-model="password" required>
            </div>

            <template v-if="errors">
                <div class="text-danger" v-for="input in errors.inputs">{{ input }}</div>
            </template>


            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mt-3">Loggati</button>
            </div>
        </form>


        <div class="register center-form mt-5 position-absolute">Non sei registrato? Registrati
            <div class="text-center">
                <router-link :to="{ name: 'register' }" class="btn btn-success">Registrati</router-link>

            </div>
        </div>


    </div>
</template>

<style scoped lang="scss"></style>
