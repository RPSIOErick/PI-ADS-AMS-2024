<script setup>
  defineProps(['input_id', 'labelText', 'placeholderText'])
  import add_icon from "/img/icons/Add.svg?url"
</script>

<style src="./style.css"></style>

<template>

  <div class="container_input">
    <label :for="input_id" class="textarea_label" >{{ labelText  }}</label><br>
    <textarea class="text_area" :id="input_id" :placeholder="placeholderText"></textarea>
  </div>

</template>

