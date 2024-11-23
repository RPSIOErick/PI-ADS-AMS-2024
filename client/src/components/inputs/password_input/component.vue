<script setup>
  import { ref, defineEmits, watch } from 'vue';

  const props = defineProps(['input_id', 'labelText', 'placeholderText', 'isRequired']);
  const emit = defineEmits(['update:input_id']);
  const localInputId = ref('')
  watch(localInputId, (newValue) => 
  {
    emit('update:input_id', newValue);
  });
  
</script>

<style src="./style.css"></style>

<template>
  <div class="container_input">
    <label :for="input_id" class="textinput_label">{{ labelText }}</label><br />
    <input 
      class="text_input" 
      type="password"
      :id="input_id" 
      :placeholder="placeholderText" 
      v-model="localInputId" 
      :required="isRequired" 
    />
  </div>
</template>
