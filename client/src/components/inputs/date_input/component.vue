<script setup>
    defineProps({
        modelValue: String, // A data selecionada, vinculada com v-model
        labelText: String,  // O texto da label
    });
</script>

<style src="./style.css"></style>

<template>
    <div class="date-input">
        <label for="date" class="dateinput_label">{{ labelText }}</label>
        <input 
            type="date" 
            id="date" 
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)" 
        />
    </div>
</template>
