<script setup>
    // Importação de componentes para o front
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'
    import { onMounted, ref } from 'vue';
    import { processData } from '../../../public/js/utils';
    import { tbl_tarefa } from '@/models/tbl_tarefa';

    // Dados estáticos para simular o conteúdo
    const tarefas = ref([])
    onMounted(async () => {
        tarefas.value = await processData("http://localhost:8080/api/tarefa/read", tbl_tarefa)
        console.log(tarefas.value)
    })
</script>

<template>
    <Back_button path="/" />
    <H1_T title="Tarefas" />

    <Read_card 
        v-for="(item, index) in tarefas" 
        :key="index" 
        :itemsData="item" 
        item1="Nome" 
        item2="Descricao"
        pk="ID_Tarefa" 
        link-update="tarefa"
        link-delete="tarefa"
        link-read-all="/tarefa"
    />

    <Create_button path="tarefa/criar" />
</template>
