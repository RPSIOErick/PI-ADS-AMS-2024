<script setup>
import { defineProps, defineEmits } from 'vue';

// Props para receber o valor do input e outras configurações
const props = defineProps({
  modelValue: String, // Para suporte ao v-model
  input_id: String,
  labelText: String,
  placeholderText: String,
  isRequired: Boolean,
});

// Emissor de eventos para atualizar o valor do v-model
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="container_input">
    <label :for="input_id" class="textinput_label">{{ labelText }}</label><br />
    <input 
      class="text_input" 
      :id="input_id" 
      :placeholder="placeholderText" 
      :required="isRequired" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style src="./style.css"></style>
