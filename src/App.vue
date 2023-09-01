<script >



export default {

  data() {
    return {

    }
  }


}


</script>

<template>
  <!-- <h1>A</h1> -->
  <router-view></router-view>
</template>

<style  lang="scss">
@use "./style/partials/mixins" as *;
@use "./style/partials/variables" as *;
@use "./style/general.scss" as *;

// @use "./style/general.scss" as *;

.lamo {
  color: red;
}

h1 {
  text-align: center;
}
</style>
