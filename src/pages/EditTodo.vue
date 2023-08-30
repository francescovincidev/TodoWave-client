<script>
import axios from "axios";
import { store } from "../store";
import TodoForm from "../components/TodoForm.vue";

// import { onMounted } from "vue";

export default {
    name: "EditTodo",
    components: {
        TodoForm
    },
    data() {
        return {
        }
    },
    methods: {

    }

}
</script>

<template>
    <TodoForm />
</template>


<style ></style>
