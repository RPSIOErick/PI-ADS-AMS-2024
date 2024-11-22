
<script setup>
        import H1_T from '../../components/text_components/h1_title/component.vue'
        import Back_button from '../../components/buttons/back_button/component.vue'
        import Read_card from '../../components/cards/read_card/component.vue'
        import Create_button from '../../components/buttons/create_button/component.vue'
   
        import { ref, onMounted } from 'vue'
        import { processData } from '../../../public/js/utils';
        import { tbl_turma } from '@/models/tbl_turma';
        
    const turmas = ref([])
    onMounted(async () => {turmas.value = await processData("http://localhost:8080/api/turma/read", tbl_turma)})
</script>

<template>

    <Back_button path="/"/>
    <H1_T title="Turmas" />

    <div v-for="(item, index) in turmas" :key="index">
        <Read_card 
            v-if="item['Status'] == true" 
            :itemsData="item" 
            item1="Nome" 
            item2="Turno" 
            pk="Cod_Aluno" 
            linkUpdate="turma"
            linkDelete="turma"
            useStatus="1"
        />
    </div>
    
    <Create_button path="turma/criar" />
</template>

