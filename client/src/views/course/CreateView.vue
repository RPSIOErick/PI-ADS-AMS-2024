
<script setup>

    import { ref, onMounted} from 'vue'
    import { createData, processData } from '../../../public/js/utils';
    import { tbl_professor } from '@/models/tbl_professor'

    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Text_input from '../../components/inputs/text_input/component.vue'
    import Black_button from '../../components/buttons/black_button/component.vue'
    import Select_input from '../../components/inputs/select_input/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import router from '@/router';
    import { toast } from 'vue3-toastify';

    const professores = ref([])
    onMounted(async () => {professores.value = await processData("http://localhost:8080/api/professor/read", tbl_professor)})

    const Nome_Curso = ref(''); 
    const Tipo_Trabalho = ref(''); 
    const Descricao_Trabalho = ref(''); 
    const ID_Prof = ref(''); 
    const Tipo_Curso = ref('');
    const Status = true;

    async function handleSubmit() 
    {
        try
        {
            const dataSend = 
            {
                Nome_Curso: Nome_Curso.value, 
                Tipo_Trabalho: Tipo_Trabalho.value, 
                Status: Status,
                Descricao_Trabalho: Descricao_Trabalho.value,  
                ID_Prof: ID_Prof.value, 
                Tipo_Curso: Tipo_Curso.value
            };
            
            createData("http://localhost:8080/api/curso/create", dataSend)
            window.location.assign('/cursos');
        }
        catch(error)
        {
            toast.error(error)
        }
    }
</script>

<template>
    <Back_button path="/cursos"/>
    <H1_T title="Criar Curso" />

    <form @submit.prevent="handleSubmit">

        <Text_input 
            label-text="Nome do Curso:" 
            placeholder-text="Nome do Curso" 
            is-required="true"
            input_id="nome_curso" 
            v-model:input_id="Nome_Curso" 
        />

        <Text_input 
            label-text="Tipo de Trabalho:" 
            placeholder-text="Tipo de Trabalho" 
            input_id="tipo_trabalho" 
            v-model:input_id="Tipo_Trabalho" 
        />


        <Text_input 
            label-text="Descrição do Trabalho:" 
            placeholder-text="Descrição do Trabalho" 
            input_id="descricao_trabalho"
            v-model:input_id="Descricao_Trabalho" 
        />

        <Select_input 
            v-model:input_id="ID_Prof"
            label-text="Professor Responsável:" 
            placeholder-text="Professor Responsavel:" 
            input_id="id_professor" 
            is-required="true"
                      
            :options-data="professores"
            pk="ID_Prof"
            option-field="Nome"
        />

        <Text_input 
            label-text="Tipo do Curso:" 
            placeholder-text="Tipo do Curso" 
            input_id="tipo_curso" 
            v-model:input_id="Tipo_Curso" 
        />
        <Black_button is-form="true" title="Salvar"/>
    </form>


</template>


