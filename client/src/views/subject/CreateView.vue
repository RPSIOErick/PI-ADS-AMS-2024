
<script setup>

    import { ref, onMounted} from 'vue'
    import { createData, processData } from '../../../public/js/utils';
    import { tbl_professor } from '@/models/tbl_professor'
    import { tbl_curso } from '@/models/tbl_curso'

    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Text_input from '../../components/inputs/text_input/component.vue'
    import Black_button from '../../components/buttons/black_button/component.vue'
    import Select_input from '../../components/inputs/select_input/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import router from '@/router';
    import { toast } from 'vue3-toastify';

    const professores = ref([])
    const cursos = ref([])
    onMounted(async () => {
        professores.value = await processData("http://localhost:8080/api/professor/read", tbl_professor)
        const allCursos = await processData("http://localhost:8080/api/curso/read", tbl_curso);
        cursos.value = allCursos.filter(curso => curso.Status === true);
    })

    const nome_disciplina = ref('')
    const id_professor = ref('')
    const Cod_Curso = ref('')

    async function handleSubmit() 
    {
        try
        {
            const dataSend = {
                "ID_Prof": id_professor.value,
                "Nome_Disc": nome_disciplina.value,
                "Cod_Curso": Cod_Curso.value
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
        <Select_input
            v-model:input_id="Cod_Curso"
            label-text="Curso:"
            placeholder-text="Escolha um curso disponível..."
            input_id="Cod_Curso"
            is-required="true"
            :options-data="cursos"
            pk="Cod_Curso"
            option-field="Nome_Curso"
        />

        <Black_button is-form="true" title="Salvar"/>
    </form>


</template>


