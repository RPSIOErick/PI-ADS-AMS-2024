
<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Text_input from '../../components/inputs/text_inputUpdate/component.vue'
    import Black_button from '../../components/buttons/black_button/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import { onMounted, ref } from 'vue';
    import { processData, updateData } from '../../../public/js/utils';
    import { useRoute } from 'vue-router';
    import { tbl_professor } from '@/models/tbl_professor';
    import { toast } from 'vue3-toastify';
import router from '@/router';

    const route = useRoute();

    const professor = ref({});
    const ID_Prof =  ref('')
    const Nome = ref('')
    const RM = ref('')

    onMounted(async () => 
    {
        try 
        {
            professor.value = await processData(`http://localhost:8080/api/professor/read/${route.params.id}`, tbl_professor);

            ID_Prof.value = professor.value.ID_Prof; 
            Nome.value = professor.value.Nome; 
            RM.value = professor.value.RM; 
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
                ID_Prof: ID_Prof.value,
                Nome: Nome_Prof.value,
                RM: RM.value,
            };

            updateData(`http://localhost:8080/api/professor/update/${ID_Prof.value}`, dataSend)

            await router.push(`/professor/${ID_Prof.value}`);
            setTimeout(() => {toast.success("Professor atualizado com sucesso!");}, 200);
        }
        catch (error)
        {
           toast.error(error);
        }
    }
</script>


<template>
    
    <Back_button path="/professores"/>
    <H1_T title="Editar Professor" />

    <form @submit.prevent="handleSubmit">
        <input type="text" id="ID_Prof" v-model="ID_Prof" hidden>

        <Text_input 
            label-text="Nome do Professor:" 
            placeholder-text="Nome do Professor" 
            input_id="Nome_Prof"
            v-model="Nome"
        />
        <Text_input 
            label-text="Registro de Matricula (RM):" 
            placeholder-text="Registro de Matricula (RM)" 
            input_id="RM"
            v-model="RM"
        />

        
        <Black_button is-form="true" title="Salvar"/>
    </form>
  

</template>
