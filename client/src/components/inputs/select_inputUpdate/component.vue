<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  input_id: String,
  labelText: String,
  placeholderText: String,
  optionsData: Array,
  pk: String,
  optionField: String,
  modelValue: String, 
  isDisabled: String
});

const emit = defineEmits(['update:modelValue']); 
const localInputId = ref(props.modelValue || 'default');

watch(() => props.modelValue, (newValue) => 
{
  localInputId.value = newValue;
});

watch(localInputId, (newValue) => 
{
  emit('update:modelValue', newValue);
});
</script>


<style src="./style.css"></style>

<template>
  <div class="container_input">
    <label :for="input_id" class="textinput_label">{{ labelText }}</label><br>
    <select 
      :id="input_id" 
      class="select_input dropdown-arrow" 
      v-model="localInputId"
      :disabled="isDisabled" 
    >
      <option value="default" disabled>{{ placeholderText }}</option>
      <option 
        v-for="option in optionsData" 
        :key="option[pk]" 
        :value="option[pk]"
      >
        {{ option[optionField] }}
      </option>
    </select>
  </div>
</template>
