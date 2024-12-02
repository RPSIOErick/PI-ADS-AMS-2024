<script setup>
  defineProps(['path'])
  import add_icon from "/img/icons/Create.svg?url"
</script>

<style src="./style.css"></style>

<template>
  <div class="container-button-create">
    <button class="create_button" type="button">
        <RouterLink :to="path || '/'">
          <img :src="add_icon" alt="Botão criar novo registro">
          Novo Registro
        </RouterLink>
    </button>
  </div>
</template>

