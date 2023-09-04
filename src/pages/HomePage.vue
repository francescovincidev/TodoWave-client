<script>

export default {
    name: "HomePage",
    data() {
        return {

        };
    }
}
</script>

<template>
    <!-- TITOLO -->
    <h1>TodoWave</h1>
    <h4>Ciao e benvenuto su TodoWave, dove le tue attività incontrano la semplicità!</h4>

    <!-- DESCRIZIONE -->
    <p>Hai mai avuto quella lista interminabile di cose da fare? Tranquillo, siamo qui per rendere tutto più facile e
        divertente! </p>
    <p>Tieni traccia dei tuoi compiti quotidiani - è come annotare tutto su un taccuino virtuale. E quando hai completato
        un'attività, fai una piccola celebrazione personale per aver fatto un passo avanti!
    </p>
    <p>Capiamo che la vita può diventare una corsa contro il tempo, quindi se lo desideri, puoi anche impostare una data di
        scadenza. In questo modo, vedrai una notifica quando mancheranno solo tre giorni alla scadenza. È un po' come avere
        il tuo assistente personale per ricordarti di dare un'occhiata alle cose importanti in programma!</p>
    <p>E se hai diverse categorie di attività, non c'è problema! Puoi organizzarle aggiungendo delle etichette.</p>

    <!-- SEZIONE LOGIN/REGISTRAZIONE -->
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

<style scoped lang="scss">
@use "../style/partials/mixins" as *;
@use "../style/partials/variables" as *;
@use "../style/general.scss" as *;


h4 {
    text-align: center;
    margin-bottom: 2rem;
    margin-top: 2rem;

}

p {
    color: #333333;
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;


}
</style>