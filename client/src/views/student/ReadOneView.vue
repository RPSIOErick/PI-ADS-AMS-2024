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

    try
    {
        cursos.value = await processData("http://localhost:8080/api/curso/read", tbl_curso);

        estudante.value = await processData(`http://localhost:8080/api/aluno/read/${route.params.id}`, tbl_aluno);

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

</script>

<template>
    <Back_button path="/estudantes"/>
    <H1_T :title="'Aluno ' + Cod_Aluno" />

    <!-- Div Cadastrar Manualmente -->



            <Select_input 
                v-model="Cod_Curso"
                label-text="Curso:" 
                placeholder-text="Escolha um curso disponível..." 
                input_id="Cod_Curso" 
                is-required="true"
                :options-data="cursos"
                pk="Cod_Curso"
                option-field="Nome_Curso"

                is-disabled="true"
            />

            <Text_input 
                label-text="Nome do Aluno:" 
                placeholder-text="Nome do Aluno" 
                input_id="Nome_Aluno" 
                v-model="Nome"

                is-disabled="true"
            />

            <Text_input 
                label-text="Registro do Aluno (RA):" 
                placeholder-text="Registro do Aluno (RA)" 
                input_id="RA" 
                v-model="RA"

                is-disabled="true"
            />
            
</template>
