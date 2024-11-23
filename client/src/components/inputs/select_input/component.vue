<script setup>
  import { defineProps, defineEmits, ref, watch, watchEffect } from 'vue'

  const props = defineProps(
  {
    input_id: String,
    labelText: String,
    placeholderText: String,
    optionsData: Object,
    pk: String,
    optionField:String,
    selectField:String
  })

  const emit = defineEmits(['update:input_id']);
  const localInputId = ref(props.input_id);

  watchEffect(() => 
  {
    localInputId.value = props.selectField || 'default'
  })

  watch(localInputId, (newValue) => 
  {
    emit('update:input_id', newValue);
  });


</script>


<style src="./style.css"></style>

<template>

  <div class="container_input">
    <label :for="input_id" class="textinput_label" >{{ labelText  }}</label><br>

    <select :id="input_id" class="select_input dropdown-arrow" v-model="localInputId">
      <option value="default" disabled>{{ placeholderText }}</option>

      <option v-for="option in Object.values(optionsData)" :key="option[pk]" :value="option[pk]">
        {{ option[optionField] }}
      </option>
    </select>

  </div>

</template>



