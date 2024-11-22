<script setup>
  defineProps(['input_id', 'labelText'])
  import add_icon from "/img/icons/Add.svg?url"
</script>

<style src="./style.css"></style>

<template>
  <div class="container_inputfile">
    <label :for="input_id" class="textinput_label">{{ labelText }}</label>
      <label :for="input_id" class="add_button" >
        <img :src="add_icon" alt="Botão adicionar arquivo">
      </label>
  </div>

  <input class="add_input" type="file" :id="input_id"/>
</template>

