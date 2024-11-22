
<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'
    import { tbl_professor } from '@/models/tbl_professor';
    import { onMounted, ref } from 'vue';
    import { processData } from '../../../public/js/utils';

    const professores = ref([])
    onMounted(async () => {professores.value = await processData("http://localhost:8080/api/professor/read", tbl_professor)})
</script>

<template >

    <Back_button path="/"/>
    <H1_T title="Professores" />
    
    <div v-for="(item, index) in professores" :key="index">
        <Read_card 
            v-if="item['Status'] == true" 
            :itemsData="item" 
            item1="Nome" 
            item2="RM" 
            pk="ID_Prof" 
            linkUpdate="professor"
            linkDelete="professor"
            linkReadAll="/professores"
            useStatus="1"
            />
    </div>
   

    <Create_button path="professor/criar" />
   
</template>

