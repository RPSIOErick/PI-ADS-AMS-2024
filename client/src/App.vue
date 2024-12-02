<script setup>
  import { RouterView } from 'vue-router'
  import Navbar from "./components/navbar/component.vue"
  import "../public/css/global.css"


</script>


<template>
  
  <header>

      <Navbar />

  </header>

  <div class="container-main">
    <div class="col-main">
      <RouterView />
    </div>

  </div>

</template>

