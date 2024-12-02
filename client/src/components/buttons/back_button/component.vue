<script setup>
  defineProps(['path'])
  import return_icon from "/img/icons/Return.svg?url"
</script>
<style src="./style.css"></style>

<template>
  <RouterLink :to="path || '/'">
    <button class="back_button">
        <img :src="return_icon" alt="Botão voltar a tela anterior" />
    </button>
  </RouterLink>
</template>


