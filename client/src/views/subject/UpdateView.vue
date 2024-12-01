<script setup>
import { ref, onMounted } from 'vue';
import { processData, updateData } from '../../../public/js/utils';
import { tbl_professor } from '@/models/tbl_professor';
import { tbl_disciplinas } from '@/models/tbl_disciplina';
import { tbl_curso } from '@/models/tbl_curso';
import { useRoute } from 'vue-router';

import H1_T from '../../components/text_components/h1_title/component.vue';
import Text_input from '../../components/inputs/text_inputUpdate/component.vue';
import Black_button from '../../components/buttons/black_button/component.vue';
import Select_input from '../../components/inputs/select_inputUpdate/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import router from '@/router';
import { toast } from 'vue3-toastify';

const route = useRoute();

const disciplina = ref({});
const professores = ref([]); 
const id_disciplina = ref(''); 
const nome_disciplina = ref('');
const id_professor = ref('');
const cursos = ref([]);
const Cod_Curso = ref('');

onMounted(async () => 
{
  let id = window.localStorage.getItem('id')
  try 
  {
    professores.value = await processData("http://localhost:8080/api/professor/read", tbl_professor);
    disciplina.value = await processData(`http://localhost:8080/api/disciplinas/read/${id}`, tbl_disciplinas);

    const allCursos = await processData("http://localhost:8080/api/curso/read", tbl_curso);
    cursos.value = allCursos.filter(curso => curso.Status === true);
    
    id_disciplina.value = disciplina.value.ID_Disc; 
    nome_disciplina.value = disciplina.value.Nome_Disc; 
    id_professor.value = disciplina.value.ID_Prof;
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
    const dataSend = {
      ID_Prof: id_professor.value,
      Nome_Disc: nome_disciplina.value,
      Cod_Curso: Cod_Curso.value
    };
    await updateData(`http://localhost:8080/api/disciplinas/update/${id_disciplina.value}`, dataSend);

    await router.push(`/disciplina/${id_disciplina.value}`);
    setTimeout(() => {toast.success("Disciplina atualizada com sucesso!");}, 200);
  }
  catch (error)
  {
      toast.error(error);
  }
}
</script>

<template>
  <Back_button path="/disciplinas"/>
  <H1_T title="Editar Disciplina" />

  <form @submit.prevent="handleSubmit">
    <input type="text" id="id_disciplina" v-model="id_disciplina" hidden>

    <Text_input 
      label-text="Nome da Disciplina:" 
      placeholder-text="Nome da Disciplina" 
      input_id="nome_disciplina" 
      v-model="nome_disciplina" 
    />

    <Select_input 
      label-text="Professor Responsável:" 
      placeholder-text="Professor Responsável:" 
      input_id="id_professor" 
      is-required="true"
      :options-data="professores"
      pk="ID_Prof"
      option-field="Nome"
      v-model="id_professor"  
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
