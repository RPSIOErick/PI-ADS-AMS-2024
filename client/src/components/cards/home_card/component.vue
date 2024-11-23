<script setup>
import { defineProps } from 'vue';
import delete_icon from "/img/icons/Delete.svg?url";
import update_icon from "/img/icons/Update.svg?url";

const props = defineProps({
  nome: String,
  link: String,
  
});


</script>

<template>
  
  <RouterLink :to="link || '/'">
    <div class="card-home">
      <ion-icon name="apps-outline"></ion-icon>
      <h2>{{ nome}}</h2>
      </div>
  </RouterLink>
   
</template>

<style src="./style.css"></style>
