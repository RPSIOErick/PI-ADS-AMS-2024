<script setup>
import { ref, onMounted } from 'vue';
import { processData } from '../../../public/js/utils';
import { tbl_professor } from '@/models/tbl_professor';
import { tbl_disciplinas } from '@/models/tbl_disciplina';
import { useRoute } from 'vue-router';

import H1_T from '../../components/text_components/h1_title/component.vue';
import Text_input from '../../components/inputs/text_inputUpdate/component.vue';
import Select_input from '../../components/inputs/select_inputUpdate/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import { toast } from 'vue3-toastify';

const route = useRoute();

const disciplina = ref({});
const professores = ref([]); 
const id_disciplina = ref(''); 
const nome_disciplina = ref('');
const id_professor = ref('');

onMounted(async () => 
{
  let id = window.localStorage.getItem('id')
  try 
  {
    professores.value = await processData("http://localhost:8080/api/professor/read", tbl_professor);
    disciplina.value = await processData(`http://localhost:8080/api/disciplinas/read/${id}`, tbl_disciplinas);
    
    id_disciplina.value = disciplina.value.ID_Disc; 
    nome_disciplina.value = disciplina.value.Nome_Disc; 
    id_professor.value = disciplina.value.ID_Prof; 
  } 
  catch (error)
  {
      toast.error(error);
  }
});

</script>

<template>
  <Back_button path="/"/>
  <H1_T :title="'Disciplina '+id_disciplina" />


    <Text_input 
      label-text="Nome da Disciplina:" 
      input_id="nome_disciplina" 
      v-model="nome_disciplina" 

      is-disabled="true"
    />

    <Select_input 
    
      label-text="Professor Responsável:" 
      input_id="id_professor" 

      :options-data="professores"
      pk="ID_Prof"
      option-field="Nome"
      v-model="id_professor"  

      is-disabled="true"

    />

</template>
