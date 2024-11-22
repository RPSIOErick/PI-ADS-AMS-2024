<script setup>
import { ref, onMounted } from 'vue';
import { processData, updateData } from '../../../public/js/utils';
import { tbl_professor } from '@/models/tbl_professor';
import { toast } from 'vue3-toastify';
import { tbl_curso } from '@/models/tbl_curso';
import { useRoute } from 'vue-router';

import H1_T from '../../components/text_components/h1_title/component.vue';
import Text_input from '../../components/inputs/text_inputUpdate/component.vue';
import Black_button from '../../components/buttons/black_button/component.vue';
import Select_input from '../../components/inputs/select_inputUpdate/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import router from '@/router';


const route = useRoute();

const curso = ref({});
const professores = ref([]); 
const Cod_Curso = ref(''); 
const Nome_Curso = ref(''); 
const Tipo_Trabalho = ref(''); 
const Descricao_Trabalho = ref(''); 
const ID_Prof = ref(''); 
const Tipo_Curso = ref(''); 

onMounted(async () => 
{
  try 
  {
    professores.value = await processData("http://localhost:8080/api/professor/read", tbl_professor);
    curso.value = await processData(`http://localhost:8080/api/curso/read/${route.params.id}`, tbl_curso);
    
    Cod_Curso.value = curso.value.Cod_Curso; 
    Nome_Curso.value = curso.value.Nome_Curso; 
    Tipo_Trabalho.value = curso.value.Tipo_Trabalho; 
    Descricao_Trabalho.value = curso.value.Descricao_Trabalho;  
    ID_Prof.value = curso.value.ID_Prof; 
    Tipo_Curso.value = curso.value.Tipo_Curso; 
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
      Cod_Curso: Cod_Curso.value, 
      Nome_Curso: Nome_Curso.value, 
      Tipo_Trabalho: Tipo_Trabalho.value, 
      Descricao_Trabalho: Descricao_Trabalho.value,  
      ID_Prof: ID_Prof.value, 
      Tipo_Curso: Tipo_Curso.value
    };
    await updateData(`http://localhost:8080/api/curso/update/${Cod_Curso.value}`, dataSend);

    await router.push(`/curso/${Cod_Curso.value}`);
    setTimeout(() => {toast.success("Curso atualizado com sucesso!");}, 200);
  }
  catch (error)
  {
      toast.error(error);
  }
}
</script>

<template>
  <Back_button path="/cursos"/>
  <H1_T title="Editar Curso" />

  <form @submit.prevent="handleSubmit">
    <input type="text" id="cod_curso" v-model="Cod_Curso" hidden>

    <Text_input 
      label-text="Nome do Curso:" 
      placeholder-text="Nome do Curso" 
      input_id="nome_curso" 
      v-model="Nome_Curso" 
    />

    <Text_input 
      label-text="Tipo de Trabalho:" 
      placeholder-text="Tipo de Trabalho" 
      input_id="tipo_trabalho" 
      v-model="Tipo_Trabalho" 
    />


    <Text_input 
      label-text="Descrição do Trabalho:" 
      placeholder-text="Descrição do Trabalho" 
      input_id="descricao_trabalho"
      v-model="Descricao_Trabalho" 
    />

    <Select_input 
      label-text="Professor Responsável:" 
      placeholder-text="Professor Responsável:" 
      input_id="id_professor" 
      is-required="true"
      :options-data="professores"
      pk="ID_Prof"
      option-field="Nome"
      v-model="ID_Prof"  
    />

    <Text_input 
      label-text="Tipo do Curso:" 
      placeholder-text="Tipo do Curso" 
      input_id="tipo_curso" 
      v-model="Tipo_Curso" 
    />

    <Black_button is-form="true" title="Salvar"/>
  </form>
</template>
