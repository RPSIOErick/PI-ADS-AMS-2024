<script setup>
  defineProps(['input_id', 'labelText', 'placeholderText'])
</script>

<style src="./style.css"></style>

<template>

  <div class="container_input">
    <label :for="input_id" class="textinput_label" >{{ labelText  }}</label><br>
    <input class="text_input" :id="input_id" :placeholder="placeholderText" type="password"/>
  </div>

</template>

