<script setup>
import { ref } from 'vue';

// Define as propriedades esperadas
defineProps({
    paths: Object
});

// Estado reativo para o botão ativo
    const activeButton = ref('importarArquivo');

// Função para alternar o botão ativo
    function toggleActive(buttonName) 
    {
        activeButton.value = buttonName;
    }
</script>

<style src="./style.css"></style>

<template>
    <div class="container-large">
        <!--Menu Multiform-->
            <div class="multiform">

                <!--Botão Importar Arquivo-->
                    <div
                        class="multiform-btn"
                        :class="{ 'multiform-active': activeButton === 'importarArquivo', 'multiform-disable': activeButton !== 'importarArquivo' }"
                        @click="toggleActive('importarArquivo')"
                    >
                        <ion-icon name="document-text-outline" class="multiform-icon"></ion-icon>
                        <p>Importar Arquivo</p>
                    </div>
                <!--Fim do Botão Importar Arquivo-->

                <!--Botão Cadastrar Manualmente-->
                    <div
                        class="multiform-btn"
                        :class="{ 'multiform-active': activeButton === 'cadastrarManualmente', 'multiform-disable': activeButton !== 'cadastrarManualmente' }"
                        @click="toggleActive('cadastrarManualmente')"
                    >
                        <ion-icon name="person-add-outline" class="multiform-icon"></ion-icon>
                        <p>Cadastrar Manualmente</p>
                    </div>
                <!--Fim do Botão Cadastrar Manualmente-->

            </div>
        <!--Fim do Menu Multiform-->
    </div>
</template>
