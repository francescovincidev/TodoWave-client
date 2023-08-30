<script>
import axios from "axios";
import { store } from "../store";
import TodoForm from "../components/TodoForm.vue";
// import { onMounted } from "vue";

export default {
    name: "CreateTodo",
    components: {
        TodoForm
    },
    data() {
        return {
            store
        }
    },
    methods: {

    },
    mounted() {

    }

}
</script>

<template>
    <TodoForm />
</template>

<style ></style>
