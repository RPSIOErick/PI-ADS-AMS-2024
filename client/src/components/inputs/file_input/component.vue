<script setup>
defineProps(['input_id', 'labelText']);
import add_icon from "/img/icons/Add.svg?url";
import file_icon from "/img/icons/Check.svg?url";

import { ref } from 'vue';

const currentIcon = ref(add_icon); // Ícone inicial
const fileName = ref(''); // Nome do arquivo selecionado

function handleFileChange(event) {
  const files = event.target.files;
  if (files && files.length > 0) {
    currentIcon.value = file_icon; // Atualiza para o ícone de arquivo
    fileName.value = files[0].name; // Salva o nome do arquivo
  } else {
    currentIcon.value = add_icon; // Volta para o ícone de adicionar
    fileName.value = ''; // Limpa o nome do arquivo
  }
}
</script>

<style src="./style.css"></style>

<template>
  <div class="container_inputfile">
    <label :for="input_id" class="textinput_label">{{ labelText }}</label>
    <label :for="input_id" class="add_button">
      <img :src="currentIcon" alt="Botão adicionar arquivo">
    </label>
    <input 
      class="add_input" 
      type="file" 
      :id="input_id" 
      @change="handleFileChange" 
    />
    <!-- Exibe o nome do arquivo se houver um -->
    <p v-if="fileName" class="file_name">{{ fileName }}</p>
  </div>
</template>
