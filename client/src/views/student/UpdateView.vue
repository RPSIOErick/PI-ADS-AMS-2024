<script setup>
import { ref, onMounted } from 'vue';
import { createData, processData, updateData } from '../../../public/js/utils';
import { tbl_curso } from '@/models/tbl_curso';

import H1_T from '../../components/text_components/h1_title/component.vue';

import Text_input from '../../components/inputs/text_inputUpdate/component.vue';
import Select_input from '../../components/inputs/select_inputUpdate/component.vue';

import Black_button from '../../components/buttons/black_button/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import { useRoute } from 'vue-router';
import { tbl_aluno } from '@/models/tbl_aluno';
import { toast } from 'vue3-toastify';
import router from '@/router';

const route = useRoute();

const estudante = ref({});
const cursos = ref([]);
const Cod_Aluno = ref('')
const Cod_Curso = ref('')
const Nome = ref('')
const RA = ref('')

onMounted(async () => 
{

    let id = window.localStorage.getItem('id')

    try
    {
        cursos.value = await processData("http://localhost:8080/api/curso/read", tbl_curso);

        estudante.value = await processData(`http://localhost:8080/api/aluno/read/${id}`, tbl_aluno);

        Cod_Aluno.value = estudante.value.Cod_Aluno; 
        Cod_Curso.value = estudante.value.Cod_Curso; 
        Nome.value = estudante.value.Nome; 
        RA.value = estudante.value.RA; 
    }
    catch (error)
    {
        toast.error(error);
    }
});


async function handleSubmit()     
{
    try 
    {
        const dataSend = 
        {
            Cod_Aluno: Cod_Aluno.value,
            Cod_Curso: Cod_Curso.value,
            Nome: Nome.value,
            RA: RA.value,
        };

        updateData(`http://localhost:8080/api/aluno/update/${Cod_Aluno.value}`, dataSend)

        await router.push(`/estudante/${Cod_Aluno.value}`);
        setTimeout(() => {toast.success("Estudante atualizado com sucesso!");}, 200);
    }
    catch (error)
    {
        toast.error(error);
    }
}

</script>

<template>
    <Back_button path="/estudantes"/>
    <H1_T title="Editar Aluno" />

    <!-- Div Cadastrar Manualmente -->

        <form @submit.prevent="handleSubmit">

            <input type="text" id="ID_Prof" v-model="Cod_Aluno" hidden>

            <Select_input 
                v-model="Cod_Curso"
                label-text="Curso:" 
                placeholder-text="Escolha um curso disponível..." 
                input_id="Cod_Curso" 
                is-required="true"
                :options-data="cursos"
                pk="Cod_Curso"
                option-field="Nome_Curso"
            />

            <Text_input 
                label-text="Nome do Aluno:" 
                placeholder-text="Nome do Aluno" 
                input_id="Nome_Aluno" 
                v-model="Nome"
            />

            <Text_input 
                label-text="Registro do Aluno (RA):" 
                placeholder-text="Registro do Aluno (RA)" 
                input_id="RA" 
                v-model="RA"
            />
            
            <Black_button is-form="true" title="Salvar" />
        </form>
</template>
