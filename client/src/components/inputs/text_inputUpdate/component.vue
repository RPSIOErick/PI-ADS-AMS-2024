<script setup>

  import { defineProps, defineEmits } from 'vue';

  const props = defineProps({
    input_id: String,
    labelText: String,
    placeholderText: String,
    modelValue: String,
    isDisabled: String
  });

  const emit = defineEmits(['update:modelValue']);
  
</script>

<style src="./style.css"></style>

<template>
  <div class="container_input">
    <label :for="input_id" class="textinput_label">{{ labelText }}</label><br />
    <input 
      class="text_input" 
      :id="input_id" 
      :placeholder="placeholderText" 

      :value="modelValue" 
      @input="event => emit('update:modelValue', event.target.value)"
      
      :disabled="isDisabled" 
      
    />
  </div>
</template>
