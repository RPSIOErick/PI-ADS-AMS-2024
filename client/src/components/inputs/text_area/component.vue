<script setup>
import { defineProps, defineEmits } from 'vue';

// Props para receber o valor do textarea e outras configurações
const props = defineProps({
  modelValue: String, // Para suporte ao v-model
  input_id: String,
  labelText: String,
  placeholderText: String,
});

// Emissor de eventos para atualizar o valor do v-model
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="container_input">
    <label :for="input_id" class="textarea_label">{{ labelText }}</label><br />
    <textarea 
      class="text_area" 
      :id="input_id" 
      :placeholder="placeholderText" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<style src="./style.css"></style>
