
<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'
    
    import { ref, onMounted } from 'vue'
    import { processData } from '../../../public/js/utils';
    import { tbl_curso } from '@/models/tbl_curso'

    const cursos = ref([])
    onMounted(async () => {cursos.value = await processData("http://localhost:8080/api/curso/read", tbl_curso)})
</script>

<template>

    <Back_button path="/"/>
    <H1_T title="Cursos" />
    <div v-for="(item, index) in cursos" :key="index">
        <Read_card 
            v-if="item['Status'] == true" 
            :itemsData="item" 
            item1="Nome_Curso" 
            item2="Descricao_Trabalho" 
            pk="Cod_Curso" 
            link-update="curso"
            link-delete="curso"
            linkReadAll="/cursos"
            use-status="1"
        />
    </div>
    
    <Create_button path="curso/criar" />
</template>
