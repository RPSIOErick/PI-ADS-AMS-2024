<script setup>
import H1_T from '../../components/text_components/h1_title/component.vue';
import Text_input from '../../components/inputs/text_input/component.vue';
import Black_button from '../../components/buttons/black_button/component.vue';
import Select_input from '../../components/inputs/select_input/component.vue';
import File_input from '../../components/inputs/file_input/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import { onMounted, ref } from 'vue';

const nomeTurma = ref('');
const turnoTurma = ref('');
const anoTurma = ref('');
const semestreTurma = ref('');
const alunos = ref([]);
const ID_Disc = ref('');

async function getAlunos() {
    const formData = new FormData();
    formData.append('csv', file_alunos.files[0]); // Substitua "file_alunos" pelo ID ou referência correta do arquivo

    try {
        const response = await fetch('http://localhost:8080/api/turma/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Erro ao importar alunos');
        }

        const result = await response.json();
        console.log('Dados recebidos da API:', result);

        alunos.value = [
            ...(result.alunosConfirmados || []),
            ...(result.alunosCadastrados || []),
        ];
        console.log('Array combinado de alunos:', alunos.value);
    } catch (error) {
        console.error(error);
        toast.error(error.message || 'Ocorreu um erro ao enviar o arquivo');
    }
}

async function submitTurma() {
    const turmaData = {
        Nome: nomeTurma.value,
        Turno: turnoTurma.value,
        Semestre: semestreTurma.value,
        Ano: anoTurma.value,
        alunos: alunos.value.map(aluno => aluno.Cod_Aluno),
        disciplinas: ID_Disc.value
    };

    console.log('Enviando dados da turma:', turmaData);

    try {
        const response = await fetch('http://localhost:8080/api/turma/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(turmaData),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar turma');
        }

        const result = await response.json();
        console.log('Turma criada com sucesso:', result);
    } catch (error) {
        console.error('Erro ao criar turma:', error);
    }
}

onMounted(() => {

  console.log('Valor inicial de nomeTurma:', nomeTurma.value);

});

</script>

<template>
  <Back_button path="/turmas" />
  <H1_T title="Criar Turma" />

  <form @submit.prevent="submitTurma">
    <!-- Campos de Dados da Turma -->
    <!-- <Text_input
      label-text="Nome da Turma:"
      placeholder-text="Nome da Turma"
      input_id="nome_turma"
      v-model="nomeTurma"
    /> -->

    <label for="nome_turma">Nome da Turma:</label>
    <input type="text" v-model="nomeTurma" />

    <br>

    <!-- <Select_input
      label-text="Turno:"
      placeholder-text="Escolha o turno aqui"
      input_id="turno_turma"
      pk="Nome_Turno"
      option-field="Nome_Turno"
      v-model="turnoTurma"
      :options-data="[
          { Nome_Turno: 'Manhã' },
          { Nome_Turno: 'Tarde' },
          { Nome_Turno: 'Noite' }
      ]"
    /> -->

    <label for="turno_turma">Turno:</label>
    <select v-model="turnoTurma">
      <option value="Manhã">Manhã</option>
      <option value="Tarde">Tarde</option>
      <option value="Noite">Noite</option>
    </select>

    <br>

    <!-- <Select_input
      label-text="Ano:"
      placeholder-text="Escolha o ano aqui"
      input_id="ano_turma"
      pk="Nome_Ano"
      option-field="Nome_Ano"
      v-model="anoTurma"
      :options-data="[
          { Nome_Ano: '1° Ano' },
          { Nome_Ano: '2° Ano' },
      ]"
    /> -->

    <label for="ano_turma">Ano:</label>
    <select v-model="anoTurma">
      <option value="1° Ano">1° Ano</option>
      <option value="2° Ano">2° Ano</option>
    </select>

    <br>

    <!-- <Select_input
      label-text="Semestre:"
      placeholder-text="Escolha o semestre aqui"
      input_id="semestre_turma"
      pk="Nome_Semestre"
      option-field="Nome_Semestre"
      v-model="semestreTurma"
      :options-data="[
          { Nome_Semestre: '1° Semestre' },
          { Nome_Semestre: '2° Semestre' },
          { Nome_Semestre: '3° Semestre' },
          { Nome_Semestre: '4° Semestre' },
          { Nome_Semestre: '5° Semestre' },
          { Nome_Semestre: '6° Semestre' },
          { Nome_Semestre: '7° Semestre' },
          { Nome_Semestre: '8° Semestre' },
          { Nome_Semestre: '9° Semestre' },
          { Nome_Semestre: '10° Semestre' }
      ]"
    /> -->

    <label for="semestre_turma">Semestre:</label>
    <select v-model="semestreTurma">
      <option value="1° Semestre">1° Semestre</option>
      <option value="2° Semestre">2° Semestre</option>
      <option value="3° Semestre">3° Semestre</option>
      <option value="4° Semestre">4° Semestre</option>
      <option value="5° Semestre">5° Semestre</option>
      <option value="6° Semestre">6° Semestre</option>
      <option value="7° Semestre">7° Semestre</option>
      <option value="8° Semestre">8° Semestre</option>
      <option value="9° Semestre">9° Semestre</option>
      <option value="10° Semestre">10° Semestre</option>
    </select>

    <br>

    <!-- <Text_input
      label-text="ID da disciplina"
      placeholder-text="ID da Disciplina"
      input_id="disciplina"
      v-model="ID_Disc"
    /> -->

    <label for="disciplina">ID da disciplina:</label>
    <input type="text" v-model="ID_Disc" />

    <!-- Importação de Alunos -->
    <File_input label-text="Importar Alunos: " input_id="file_alunos" />
    <button class="black_button" v-on:click="getAlunos" type="button"> IMPORTAR ALUNOS </button>

    <!-- Lista de Alunos -->
    <h2>Lista de Alunos</h2>
    <div v-if="alunos.length > 0">
        <div v-for="(aluno, index) in alunos" :key="index">
            <p>{{ aluno.Nome }} ({{ aluno.Cod_Aluno }})</p>
        </div>
    </div>
    <p v-else>Nenhum aluno importado ainda.</p>

    <!-- Botão de Submissão -->
    <Black_button is-form="true" title="Salvar Turma" />
  </form>
</template>
