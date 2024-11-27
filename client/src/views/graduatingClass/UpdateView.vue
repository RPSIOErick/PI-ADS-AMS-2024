<script setup>
import H2_T from '../../components/text_components/h2_title/component.vue'
import Text from '../../components/text_components/text/component.vue'
import File_input from '../../components/inputs/file_input/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import Select_input from '../../components/inputs/select_inputUpdate/component.vue';
import Text_input from '../../components/inputs/text_inputUpdate/component.vue';
import Black_button from '../../components/buttons/black_button/component.vue'
import { onMounted, ref } from 'vue';
import { processData, updateData } from '../../../public/js/utils';
import { tbl_curso } from '@/models/tbl_curso';
import { tbl_disciplinas } from '@/models/tbl_disciplina';
import { toast } from 'vue3-toastify';
import { tbl_turma } from '@/models/tbl_turma';


const activeForm = ref('alunos');

const turmas = ref([])
const alunos = ref([]);
const cursos = ref([])
const disciplinas = ref([])


const nomeTurma = ref('');
const turnoTurma = ref('');
const anoTurma = ref('');
const semestreTurma = ref('');
const ID_Disc = ref('')
const Cod_Curso = ref('')

function toggleForm(formName) {activeForm.value = formName;}

async function getAlunos() 
{
    const formData = new FormData();
    formData.append('Cod_Curso', Cod_Curso.value); 
    formData.append('csv', file_alunos.files[0]); 

    try
    {
        const response = await fetch('http://localhost:8080/api/turma/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) 
        {
            throw new Error('Erro ao importar alunos');
        }

        const result = await response.json();

        alunos.value = [
            ...(result.alunosConfirmados || []),
            ...(result.alunosCadastrados || []),
        ];
    } 
    catch (error) {toast.error(error.message || 'Ocorreu um erro ao enviar o arquivo');}
}

async function submitTurma() 
{
    try 
    {
        const turmaData = 
        {
            Nome: nomeTurma.value,
            Turno: turnoTurma.value,
            Semestre: semestreTurma.value,
            Ano: anoTurma.value,
            disciplina: ID_Disc.value,
        };

        updateData("http://localhost:8080/api/turma/update/", tbl_turma)
    
        if (!response.ok) {throw new Error('Erro ao editar a turma'); }

        const result = await response.json();
        
        window.location.assign('/Turma');
    } 
    catch (error) {toast.error('Erro ao criar turma:', error);}
}

onMounted(async () => 
{
    try
    {
        let id = window.localStorage.getItem('id')
        
        turmas.value = await processData(`http://localhost:8080/api/turma/read/${id}`, tbl_turma)
        cursos.value = await processData("http://localhost:8080/api/curso/read", tbl_curso)
        disciplinas.value = await processData("http://localhost:8080/api/disciplinas/read", tbl_disciplinas);

        nomeTurma.value = turmas.value.Nome
        turnoTurma.value = turmas.value.Turno
        semestreTurma.value =  turmas.value.Semestre
        anoTurma.value =  turmas.value.Ano
        ID_Disc.value =  turmas.value.ID_Disc
        // Cod_Curso.value =
        // alunos.value.map(aluno => aluno.Cod_Aluno),
    }
    catch (error) {toast.error(error);}
});


</script>

<template>
      <!-- Botões de seleção para alternar entre os formulários -->
      <div class="container-large">
        <div class="multiform">

          <div
              :class="{ 'multiform-active': activeForm === 'alunos', 'multiform-disable': activeForm !== 'alunos' }"
              class="multiform-btn"
              @click="toggleForm('alunos')"
          >
              <ion-icon name="person-add-outline" class="multiform-icon"></ion-icon>
              <p>Alunos</p>
          </div>

          <div
            :class="{ 'multiform-active': activeForm === 'turma', 'multiform-disable': activeForm !== 'turma' }"
            class="multiform-btn"
            @click="toggleForm('turma')"
        >
            <ion-icon name="document-text-outline" class="multiform-icon"></ion-icon>
            <p>Dados da Turma</p>
        </div>

    </div>
    </div>

    <div v-show="activeForm === 'alunos'" class="alunos">

      <Back_button path="/turmas" />
      <H2_T title="Alunos" />

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
<br>
      <!-- Lista de Alunos -->
      <H2_T title="Alunos Importados" />
        <div v-if="alunos.length > 0">
            <div v-for="(aluno, index) in alunos" :key="index">
                <Text :text="'RA: ' + aluno.Cod_Aluno" /><br>
                <Text :text="'Nome: ' + aluno.Nome" /><br>
                <br>
                
            </div>
        </div>
      <Text v-else text="Nenhum aluno importado ainda" />


  </div>

  <div v-show="activeForm === 'turma'" class="turma">

      <Back_button path="/turmas" />
      <H2_T title="Dados da Turma" />

      <form @submit.prevent="submitTurma">

          <Text_input
                label-text="Nome da Turma:"
                placeholder-text="Nome da Turma"
                input_id="Nome"
                is-required="true"
                v-model="nomeTurma"
            />

          <Select_input
            v-model="turnoTurma" 
            label-text="Turno:" 
            placeholder-text="Escolha o turno aqui" 
            input_id="turno_turma" 
            pk="Nome_Turno" 
            option-field="Nome_Turno" 
            :options-data="[
                {Nome_Turno: 'Manhã'},
                {Nome_Turno: 'Tarde'},
                {Nome_Turno: 'Noite'}
            ]"
          />

        <Select_input 
          v-model="anoTurma"
          label-text="Ano:" 
          placeholder-text="Escolha o ano aqui" 
          input_id="ano_turma"
          pk="Nome_Ano" 
          option-field="Nome_Ano" 
          :options-data="[
                {Nome_Ano: '1° Ano'},
                {Nome_Ano: '2° Ano'},
            ]"
        />
        <Select_input 
          v-model="semestreTurma"
          label-text="Semestre:" 
          placeholder-text="Escolha o semestre aqui" 
          input_id="semestre_turma"
          pk="Nome_Semestre" 
          option-field="Nome_Semestre" 
          :options-data="[
                {Nome_Semestre: '1° Semestre'},
                {Nome_Semestre: '2° Semestre'},
                {Nome_Semestre: '3° Semestre'},
                {Nome_Semestre: '4° Semestre'},
                {Nome_Semestre: '5° Semestre'},
                {Nome_Semestre: '6° Semestre'},
                {Nome_Semestre: '7° Semestre'},
                {Nome_Semestre: '8° Semestre'},
                {Nome_Semestre: '9° Semestre'},
                {Nome_Semestre: '10° Semestre'},
            ]"
        />


          <Select_input
                v-model="ID_Disc"
                label-text="Disciplinas:"
                placeholder-text="Escolha uma disciplina disponível..."
                input_id="ID_Disc"
                is-required="true"
                :options-data="disciplinas"
                pk="ID_Disc"
                option-field="Nome_Disc"
            />


            <Black_button is-form="true" title="Salvar Tudo" />
      </form>
    </div>



</template>