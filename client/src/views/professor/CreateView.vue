
<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Text_input from '../../components/inputs/text_input/component.vue'
    import Black_button from '../../components/buttons/black_button/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import { ref } from 'vue';
    import { createData } from '../../../public/js/utils';
    import { toast } from 'vue3-toastify';
    import router from '@/router';

    const Nome_Prof = ref('')
    const RM = ref('')

    async function handleSubmit() 
    {
        try
        {
            const dataSend = 
            {
                "Nome": Nome_Prof.value,
                "RM": RM.value,
            };

            createData("http://localhost:8080/api/professor/create", dataSend)
            window.location.assign('/professores');
        }
        catch(error)
        {
            toast.error(error)
        }

    }
</script>


<template>
    
    <Back_button path="/professores"/>
    <H1_T title="Criar Professor" />

    <form @submit.prevent="handleSubmit">
        <Text_input 
            label-text="Nome do Professor:" 
            placeholder-text="Nome do Professor" 
            input_id="Nome_Prof"
            is-required="true"

            v-model:input_id="Nome_Prof"
        />
        <Text_input 
            label-text="Registro de Matricula (RM):" 
            placeholder-text="Registro de Matricula (RM)" 
            input_id="RM"
            is-required="true"

            v-model:input_id="RM"
        />

        
        <Black_button is-form="true" title="Salvar"/>
    </form>
  

</template>
