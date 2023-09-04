<script>

import { store } from "../store";
import TodoForm from "../components/TodoForm.vue";


export default {
    name: "CreateTodo",
    components: {
        TodoForm
    },
    data() {
        return {
            store
        }
    }

}
</script>

<template>
    <TodoForm />
</template>

<style ></style>
