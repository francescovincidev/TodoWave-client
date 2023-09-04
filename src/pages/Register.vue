<script>
import axios from "axios";
import { store } from "../store";
export default {
  name: "Register",
  data() {
    return {
      email: '',
      password: '',
      username: '',
      passwordRepeat: '',
      errors: {},
      store

    }
  },
  methods: {
    registerUser() {

      axios.post(`${this.store.baseURL}/endpoints/user_endpoints.php/register`, {
        email: this.email,
        password: this.password,
        passwordRepeat: this.passwordRepeat,
        username: this.username
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
            console.log(error);
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
      Registrati e inizia a tracciare i tuoi compiti
    </p>

    <form @submit.prevent="registerUser" class="center-form">
      <div class="position-relative">
        <label>Nome:</label>
        <input type="text" class="form-control" minlength="2" maxlength="20"
          :class="errors.usernames && !errors.inputs ? 'is-invalid' : ''" v-model="username" required>
        <template v-if="errors && !errors.inputs">
          <div class="position-absolute start-50 translate-middle invalid-feedback text-center" role="alert"
            v-for="username in errors.usernames">{{ username }}</div>
        </template>
      </div>

      <div class="position-relative">
        <label>Email:</label>
        <input type="email" class="form-control" :class="errors.emails && !errors.inputs ? 'is-invalid' : ''"
          v-model="email" required>
        <template v-if="errors && !errors.inputs">
          <div class="position-absolute start-50 translate-middle invalid-feedback" role="alert"
            v-for="email in errors.emails">{{ email }}</div>
        </template>

      </div>

      <div class="position relative">
        <label>Password:</label>
        <input type="password" class="form-control" :class="errors.passwords && !errors.inputs ? 'is-invalid' : ''"
          v-model="password" minlength="8" required>
        <template v-if="errors && !errors.inputs">
          <div class="position-absolute start-50 translate-middle invalid-feedback" role="alert"
            v-for="password in errors.passwords">{{ password }}</div>
        </template>
      </div>

      <div class="position-relative">
        <label>Ripeti password:</label>
        <input type="password" class="form-control" :class="errors.passwordsRepeat && !errors.inputs ? 'is-invalid' : ''"
          v-model="passwordRepeat" required>
        <template v-if="errors && !errors.inputs && !errors.passwords">
          <div class="position-absolute start-50 translate-middle invalid-feedback nowrap" role="alert"
            v-for="password in errors.passwordsRepeat">{{ password }}</div>
        </template>

      </div>
      <template v-if="errors">
        <div class="text-danger" role="alert" v-for="input in errors.inputs">
          {{ input }}</div>
      </template>

      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-success mt-3">Registrati</button>
      </div>
    </form>
    <div class="register center-form mt-5 position-absolute">Sei già registrato?
      <div class="text-center">
        <router-link :to="{ name: 'login' }" class="btn btn-primary ">Entra</router-link>

      </div>
    </div>

  </div>
</template>

<style lang="scss"></style>
