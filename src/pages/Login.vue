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
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    this.errors = [];
                    console.log('Login avvenuto con successo');
                    this.store.logged_id = response.data.logged_id;
                    this.store.username = response.data.username;
                    this.$router.push(`/todos`);
                })
                .catch(error => {
                    this.errors = [];
                    console.log('Errore durante il login:', error);
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
        <h1 class="mt-4">TodoWave</h1>

        <p class="text-center">
            Effettua il login per recuperare la tua todo
        </p>

        <form @submit.prevent="loginUser" class="center-form">
            <div class="position-relative">
                <label>Email:</label>
                <input type="email" class="form-control" :class="errors.emails && !errors.inputs ? 'is-invalid' : ''"
                    v-model="email" required>
                <template v-if="errors && !errors.inputs">
                    <div class="position-absolute start-50 translate-middle invalid-feedback" role="alert"
                        v-for="email in errors.emails">{{ email }}</div>
                </template>
            </div>

            <div class="position-relative">

                <label>Password:</label>
                <input type="password" class="form-control" :class="errors.passwords && !errors.inputs ? 'is-invalid' : ''"
                    v-model="password" required>
            </div>

            <template v-if="errors">
                <div class="text-danger" v-for="input in errors.inputs">{{ input }}</div>
            </template>

            <!-- <button type="submit" class="btn btn-primary d-block mt-3">Loggati</button> -->
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mt-3">Loggati</button>
            </div>
        </form>
        <!-- </div> -->

        <!-- <div class="col-4"> -->

        <div class="register center-form mt-5 position-absolute">Non sei registrato? Registrati
            <div class="text-center">
                <router-link :to="{ name: 'register' }" class="btn btn-success">Registrati</router-link>

            </div>
        </div>


    </div>
</template>

<style scoped lang="scss">
// .container {
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     .center-form {
//         text-align: center;
//         display: flex;
//         flex-direction: column;

//         /* Centrare gli elementi interni orizzontalmente */
//         input {
//             margin-bottom: 20px;
//         }
//     }

// }
</style>
