<script setup>
import { ref, onMounted } from 'vue';
import { createData, processData } from '../../../public/js/utils';
import { tbl_curso } from '@/models/tbl_curso';

import H1_T from '../../components/text_components/h1_title/component.vue';
import H2_T from '../../components/text_components/h2_title/component.vue';
import Text from '../../components/text_components/text/component.vue';
import Link from '../../components/text_components/link/component.vue';

import Text_input from '../../components/inputs/text_input/component.vue';
import File_input from '../../components/inputs/file_input/component.vue';
import Select_input from '../../components/inputs/select_input/component.vue';

import Black_button from '../../components/buttons/black_button/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import { toast } from 'vue3-toastify';

const cursos = ref([]);
const activeForm = ref('importFile');

onMounted(async () => {
    // Busca todos os cursos e filtra pelo Status
    const allCursos = await processData("http://localhost:8080/api/curso/read", tbl_curso);
    cursos.value = allCursos.filter(curso => curso.Status === true);
});

function toggleForm(formName) {
    activeForm.value = formName;
}

const Cod_Curso = ref('');
const Nome_Aluno = ref('');
const RA = ref('');

async function handleSubmit() {
    try {
        const dataSend = {
            "Cod_Curso": Cod_Curso.value,
            "Nome": Nome_Aluno.value,
            "RA": RA.value,
        };
        await createData("http://localhost:8080/api/aluno/create", dataSend);
        window.location.assign('/estudantes');
    } catch (error) {
        toast.error(error);
    }
}

async function handleSubmitByFile() {
    const formData = new FormData();
    formData.append('Cod_Curso', Cod_Curso.value); // Código do curso
    formData.append('csv', file_alunos.files[0]); // Arquivo CSV

    try {
        await fetch('http://localhost:8080/api/aluno/upload', {
            method: 'POST',
            body: formData,
        });

        window.location.assign('/estudantes');
    } catch (error) {
        console.error('Error:', error);
        toast.error(error.message || 'Ocorreu um erro ao enviar o arquivo');
    }
}
</script>

<style scoped>
.text-import {
    text-align: center;
}
</style>

<template>
    <Back_button path="/estudantes" />
    <H1_T title="Criar Aluno(s)" />

    <!-- Botões de seleção para alternar entre os formulários -->
    <div class="container-large">
        <div class="multiform">
            <div
                :class="{ 'multiform-active': activeForm === 'importFile', 'multiform-disable': activeForm !== 'importFile' }"
                class="multiform-btn"
                @click="toggleForm('importFile')"
            >
                <ion-icon name="document-text-outline" class="multiform-icon"></ion-icon>
                <p>Importar Arquivo</p>
            </div>

            <div
                :class="{ 'multiform-active': activeForm === 'doManually', 'multiform-disable': activeForm !== 'doManually' }"
                class="multiform-btn"
                @click="toggleForm('doManually')"
            >
                <ion-icon name="person-add-outline" class="multiform-icon"></ion-icon>
                <p>Cadastrar Manualmente</p>
            </div>
        </div>
    </div>

    <!-- Div Importar Arquivo -->
    <div v-show="activeForm === 'importFile'" class="form_importFile">
        <H2_T title="Importar Arquivo" />

        <div class="text-import">
            <Text text="Importe um arquivo .csv com o nome de todos os alunos da turma," />
            <Link text="saiba como gerar uma lista de alunos pelo sistema SIGA" link="https://siga.cps.sp.gov.br/aluno/login.aspx?" />
        </div>

        <form @submit.prevent="handleSubmitByFile">
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
            <File_input input_id="file_alunos" />
            <Black_button is-form="true" title="Salvar" />
        </form>
    </div>

    <!-- Div Cadastrar Manualmente -->
    <div v-show="activeForm === 'doManually'" class="form_doManually">
        <H2_T title="Cadastrar Aluno Manualmente" />

        <form @submit.prevent="handleSubmit">
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

            <Text_input
                label-text="Nome do Aluno:"
                placeholder-text="Nome do Aluno"
                input_id="Nome_Aluno"
                is-required="true"
                v-model="Nome_Aluno"
            />

            <Text_input
                label-text="Registro do Aluno (RA):"
                placeholder-text="Registro do Aluno (RA)"
                input_id="RA"
                is-required="true"
                v-model="RA"
            />

            <Black_button is-form="true" title="Salvar" />
        </form>
    </div>
</template>
