
<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'
    
    import { ref, onMounted } from 'vue'
    import { processData } from '../../../public/js/utils';
    import { tbl_aluno } from '@/models/tbl_aluno';

    const estudantes = ref([])
    onMounted(async () => {estudantes.value = await processData("http://localhost:8080/api/aluno/read", tbl_aluno)})
</script>

<template>
    
    <Back_button path="/"/>
    <H1_T title="Estudantes" />

    <Read_card 
        v-for="(item, index) in estudantes" 
        :key="index" 
        :itemsData="item" 
        item1="Nome" 
        item2="RA" 
        pk="Cod_Aluno" 
        linkUpdate="estudante"
        linkDelete="aluno"
        linkReadAll="/estudantes"
    />
    
    <Create_button path="estudante/criar" />
   
</template>

