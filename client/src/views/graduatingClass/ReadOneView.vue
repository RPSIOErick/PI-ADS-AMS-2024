<script setup>
import H2_T from '../../components/text_components/h2_title/component.vue'
import Text from '../../components/text_components/text/component.vue'
import File_input from '../../components/inputs/file_input/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import Select_input from '../../components/inputs/select_inputUpdate/component.vue';
import Text_input from '../../components/inputs/text_inputUpdate/component.vue';
import Black_button from '../../components/buttons/black_button/component.vue'
import { onMounted, ref } from 'vue';
import { deleteById, processData, updateData } from '../../../public/js/utils';
import { tbl_curso } from '@/models/tbl_curso';
import { tbl_disciplinas } from '@/models/tbl_disciplina';
import { toast } from 'vue3-toastify';
import { tbl_turma } from '@/models/tbl_turma';
import { tbl_inscricao } from '@/models/tbl_inscricao';
import { tbl_aluno } from '@/models/tbl_aluno';


const activeForm = ref('alunos');

const turmas = ref([])
const inscricao = ref([])
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

async function handleDelete(id) 
{
    deleteById('http://localhost:8080/api/inscricao/delete/' + id)
    window.location.assign('/turma/editar');    
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
            Disciplina: ID_Disc.value,
        };

        updateData(`http://localhost:8080/api/turma/update/${window.localStorage.getItem('id')}`, turmaData)
            
        window.location.assign('/Turma');
    } 
    catch (error) {toast.error(error);}
}

onMounted(async () => 
{
    try
    {
        let id = window.localStorage.getItem('id')
        
        turmas.value = await processData(`http://localhost:8080/api/turma/read/${id}`, tbl_turma)
        inscricao.value = await processData("http://localhost:8080/api/inscricao/read", tbl_inscricao)
        alunos.value = await processData("http://localhost:8080/api/aluno/read", tbl_aluno)
        cursos.value = await processData("http://localhost:8080/api/curso/read", tbl_curso)
        disciplinas.value = await processData("http://localhost:8080/api/disciplinas/read", tbl_disciplinas);

        nomeTurma.value = turmas.value.Nome
        turnoTurma.value = turmas.value.Turno
        semestreTurma.value =  turmas.value.Semestre
        anoTurma.value =  turmas.value.Ano
        ID_Disc.value =  turmas.value.ID_Disc
        // Cod_Curso.value =
        // inscricao.value.map(inscricao => inscricao.ID_Inscricao),
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

      <!-- Lista de Alunos -->
      <div v-if="inscricao.length > 0">
    <div 
        v-for="(inscricaos, index) in inscricao" 
        :key="index"
    >
    <!-- <div v-if="inscricaos.ID_Turma == window.localStorage.getItem('id')"> -->
        
        <Text 
            :text="'Aluno: ' + 
                (alunos.find(aluno => aluno.Cod_Aluno == inscricaos.Cod_Aluno)?.Nome || 'Aluno não encontrado')" 
        />
        <br>
        <Text :text="'Turma: ' + inscricaos.ID_Turma" /><br>         
        <br><br>
    <!-- </div> -->
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

                is-disabled="true"
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

            is-disabled="true"
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

            is-disabled="true"
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

            is-disabled="true"
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

                is-disabled="true"
            />
      </form>
    </div>



</template>