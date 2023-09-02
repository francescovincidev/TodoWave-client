<script>


export default {
    name: "NotFound",
    data() {
        return {
        }
    },


}
</script>

<template>
    <h1>TodoWave</h1>

    <h2 class="text-center">La pagina che cerchi non esiste!</h2>
    <div class="cta-buttons d-flex justify-content-around">
        <div class="cta-button">

            <p class="cta-caption">Sei già parte di TodoWave? Accedi e inizia!</p>
            <router-link :to="{ name: 'login' }" class="btn btn-primary">Entra</router-link>


        </div>

        <div class="cta-button">
            <p class="cta-caption">Nuovo qui? Unisciti a noi per gestire le tue attività in modo migliore!</p>
            <router-link :to="{ name: 'register' }" class="btn btn-success">Registrati</router-link>
        </div>

    </div>
</template>


<style ></style>
