<script setup>
    defineProps({
        modelValue: String, // O horário selecionado, vinculado com v-model
        labelText: String,  // O texto da label
    });
</script>

<style src="./style.css"></style>

<template>
    <div class="time-input">
        <label for="time" class="timeinput_label">{{ labelText }}</label>
        <input 
            type="time" 
            id="time" 
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" 
        />
    </div>
</template>
