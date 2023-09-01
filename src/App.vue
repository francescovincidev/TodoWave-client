<script >

import { store } from './store';


export default {

  data() {
    return {
      store
    }
  }


}


</script>

<template>
  <!-- <h1>A</h1> -->
  <router-view></router-view>
  <div v-if="store.notification" class=" bg-success-subtle border-success rounded notification">
    {{ store.notification }}
  </div>
  <div v-if="store.error" class=" bg-danger-subtle border-danger rounded notification">
    {{ store.error }}
  </div>
</template>

<style  lang="scss">
@use "./style/partials/mixins" as *;
@use "./style/partials/variables" as *;
@use "./style/general.scss" as *;

.notification {
  @include animated_notification;
}

// @use "./style/general.scss" as *;

.lamo {
  color: red;
}

h1 {
  text-align: center;
}
</style>
