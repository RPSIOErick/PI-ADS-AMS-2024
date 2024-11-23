
<script setup>

    import { ref, onMounted} from 'vue'
    import { processData, createData } from '../../../public/js/utils';
    import router from '@/router';
    import axios from 'axios'
    import { toast } from 'vue3-toastify';


    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Text_input from '../../components/inputs/text_input/component.vue'
    import Black_button from '../../components/buttons/black_button/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Password_input from '../../components/inputs/password_input/component.vue'


    const credential_user = ref(''); 
    const password_user = ref(''); 

    async function handleSubmit() 
    {
        try
        {
            let data = 
            {
                "rm": credential_user.value, 
                "password": password_user.value
                
            };

            console.log(data)

            fetch('http://localhost:8080/api/professor/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json()) // Getting the response in JSON
            .then(data => {
                if (data) { // If there is a data, store it in the local storage
                window.localStorage.setItem('token', data);
                console.log('Login bem-sucedido:', data);
                window.location.assign('/Home');
                } else {
                console.error('Erro: Token não encontrado na resposta');
                }
            })
            .catch((error) => {
                console.error('Erro no login:', error);
            });

        }
        catch(error)
        {
            toast.error(error)
        }
    }
</script>

<template>
    <H1_T title="Fazer Login" />

    <form @submit.prevent="handleSubmit">

        <Text_input 
            label-text="RM ou RA:" 
            placeholder-text="RA ou RM" 
            is-required="true"
            input_id="credential_user" 
            v-model:input_id="credential_user" 
        />

        <Password_input 
            label-text="Senha" 
            placeholder-text="Senha" 
            input_id="password_user" 
            v-model:input_id="password_user" 
        />

        <Black_button is-form="true" title="Entrar"/>
    </form>


</template>


