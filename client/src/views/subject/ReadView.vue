
<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'
    
    import { ref, onMounted } from 'vue'
    import { processData } from '../../../public/js/utils';
    import { tbl_disciplinas } from '@/models/tbl_disciplina';

    const disciplinas = ref([])
    onMounted(async () => {disciplinas.value = await processData("http://localhost:8080/api/disciplinas/read", tbl_disciplinas)})
</script>

<template>

    <Back_button path="/"/>
    <H1_T title="Disciplinas" />

    <Read_card 
        v-for="(item, index) in disciplinas" 
        :key="index" 
        :itemsData="item" 
        item1="Nome_Disc" 
        item2="ID_Disc" 
        pk="ID_Disc" 
        link-update="disciplina"
        link-delete="disciplinas"
        link-read-all="/disciplinas"
    />
    
    <Create_button path="disciplina/criar" />
</template>
