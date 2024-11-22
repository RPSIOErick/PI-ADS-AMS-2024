
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

    const id_disciplina = ref('')
    const nome_disciplina = ref('')
    const id_professor = ref('')

    async function handleSubmit() 
    {
        try
        {
            const dataSend = {
                "ID_Disc": id_disciplina.value,
                "ID_Prof": id_professor.value,
                "Nome_Disc": nome_disciplina.value
            };
            
            createData("http://localhost:8080/api/disciplinas/create", dataSend)

            window.location.assign('/disciplinas');
        }
        catch(error)
        {
            toast.error(error)
        }
    }
</script>

<template>
    <Back_button path="/disciplinas"/>
    <H1_T title="Criar Disciplina" />

    <form @submit.prevent="handleSubmit">
        <Text_input 
            label-text="Id da Disciplina:" 
            placeholder-text="Id da Disciplina" 
            input_id="id_disciplina" 
            is-required="true"

            v-model:input_id="id_disciplina"
        />

        <Text_input 
            label-text="Nome da Disciplina:" 
            placeholder-text="Nome da Disciplina" 
            input_id="nome_disciplina" 
            is-required="true"

            v-model:input_id="nome_disciplina"
        />
        <Select_input 
            v-model:input_id="id_professor"
            label-text="Professor Responsável:" 
            placeholder-text="Professor Responsavel:" 
            input_id="id_professor" 
            is-required="true"
                      
            :options-data="professores"
            pk="ID_Prof"
            option-field="Nome"
        />

        <Black_button is-form="true" title="Salvar"/>
    </form>


</template>


