<script setup>
    // Importação de componentes para o front
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'

    // Dados estáticos para simular o conteúdo
    const tarefas = [
        { Nome_Tarefa: "Projeto CRUD", ID_Tarefa: 1 },
        { Nome_Tarefa: "App Biblioteca", ID_Tarefa: 2 },
    ];
</script>

<template>
    <Back_button path="/" />
    <H1_T title="Tarefas" />

    <Read_card 
        v-for="(item, index) in tarefas" 
        :key="index" 
        :itemsData="item" 
        item1="Nome_Tarefa" 
        item2="ID_Tarefa" 
        pk="ID_Tarefa" 
        link-update="tarefas"
        link-delete="tarefas"
        link-read-all="/tarefas"
    />

    <Create_button path="tarefa/criar" />
</template>
