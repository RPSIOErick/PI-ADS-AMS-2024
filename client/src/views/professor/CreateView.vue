<script setup>
import H1_T from '../../components/text_components/h1_title/component.vue'
import Text_input from '../../components/inputs/text_input/component.vue'
import Black_button from '../../components/buttons/black_button/component.vue'
import Back_button from '../../components/buttons/back_button/component.vue'
import { ref } from 'vue';
import { createData } from '../../../public/js/utils';
import { toast } from 'vue3-toastify';
import router from '@/router';

const Nome_Prof = ref('');
const rm = ref('');
const password = ref('');
const roles = ref([]);

const roleOptions = ["Administrador", "Responsável", "Orientador", "Coordenador", "Diretor"];

async function handleSubmit() {
    try {
        const dataSend = {
            "Nome": Nome_Prof.value,
            "RM": rm.value,
            "password": password.value,
            "roles": roles.value
        };

        createData("http://localhost:8080/api/professor/create", dataSend);
        window.location.assign('/professores');
    } catch (error) {
        toast.error(error);
    }
}
</script>

<template>
    <Back_button path="/professores" />
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
            input_id="rm"
            is-required="true"
            v-model:input_id="rm"
        />

        <!-- Checkboxes para os papéis -->
        <div class="checkbox-group">
            <h3 class="roles-title">Selecione os Papéis:</h3>
            <label v-for="role in roleOptions" :key="role" class="checkbox-label">
                <input 
                    type="checkbox" 
                    :value="role" 
                    v-model="roles"
                    class="checkbox-input"
                />
                <span class="checkbox-custom"></span>
                {{ role }}
            </label>
        </div>

        <Black_button is-form="true" title="Salvar" />
    </form>
</template>

<style scoped>
.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
}

.roles-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}

.checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    color: #555;
}

.checkbox-input {
    display: none;
}

.checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid #555;
    border-radius: 4px;
    display: inline-block;
    margin-right: 10px;
    transition: background-color 0.3s, border-color 0.3s;
}

.checkbox-input:checked + .checkbox-custom {
    background-color: #2e2e2e;
    border-color: #2e2e2e;
}

.checkbox-label:hover .checkbox-custom {
    border-color: #2e2e2e;
}
</style>
