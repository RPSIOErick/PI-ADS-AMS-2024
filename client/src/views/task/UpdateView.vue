<script setup>
import { ref, onMounted } from 'vue';
import { createData, processData } from '../../../public/js/utils';

import H1_T from '../../components/text_components/h1_title/component.vue';
import H2_T from '../../components/text_components/h2_title/component.vue';
import Text from '../../components/text_components/text/component.vue';
import Link from '../../components/text_components/link/component.vue';

import Text_input from '../../components/inputs/text_input/component.vue';
import Text_area from '../../components/inputs/text_area/component.vue';
import File_input from '../../components/inputs/file_input/component.vue';
import Select_input from '../../components/inputs/select_input/component.vue';
import DateInput from '../../components/inputs/date_input/component.vue'; 
import TimeInput from '../../components/inputs/time_input/component.vue'; 

import Black_button from '../../components/buttons/black_button/component.vue';
import Back_button from '../../components/buttons/back_button/component.vue';
import { toast } from 'vue3-toastify';
import router from '@/router';

const Nome_Tarefa = ref('');
const Cod_Tarefa = ref('');
const Date_lancamento = ref('');
const Date_entrega = ref('');
const Hora_lancamento = ref('');
const Hora_entrega = ref('');

const activeForm = ref('importFile');

const toggleForm = (formName) => {
    activeForm.value = formName;
};

// Função para enviar os dados do formulário para o back-end
const handleSubmit = async () => {
    const tarefaData = {
        Nome: Nome_Tarefa.value,
        Descricao: Cod_Tarefa.value,
        DataLancamento: Date_lancamento.value,
        HoraLancamento: Hora_lancamento.value,
        DataEntrega: Date_entrega.value,
        HoraEntrega: Hora_entrega.value
    };

    try {
        // Enviando os dados para o back-end usando axios
        const response = await axios.post('http://localhost:3000/api/tarefas', tarefaData);
        
        // Exibindo uma mensagem de sucesso
        toast.success('Tarefa criada com sucesso!');
        console.log(response.data);

        // Redireciona para a página de tarefas após sucesso
        router.push('/tarefa');
    } catch (error) {
        // Exibindo uma mensagem de erro
        toast.error('Erro ao criar tarefa!');
        console.error(error);
    }
};

</script>

<template>
    <Back_button path="/tarefa"/>
    <H1_T title="Editar Tarefa" />

    <!-- Botões de seleção para alternar entre os formulários -->
    <div class="container-large">
        <div class="multiform">
            <div
                :class="{ 'multiform-active': activeForm === 'importFile', 'multiform-disable': activeForm !== 'importFile' }"
                class="multiform-btn"
                @click="toggleForm('importFile')"
            >
                <ion-icon name="information-circle-outline" class="multiform-icon"></ion-icon>
                <p>Geral</p>
            </div>

            <div
                :class="{ 'multiform-active': activeForm === 'doManually', 'multiform-disable': activeForm !== 'doManually' }"
                class="multiform-btn"
                @click="toggleForm('doManually')"
            >
                <ion-icon name="calendar-outline" class="multiform-icon"></ion-icon>
                <p>Datas</p>
            </div>
        </div>
    </div>

    <!-- Formulário Geral -->
    <div v-show="activeForm === 'importFile'" class="form_importFile">
        <H2_T title="Geral" />
        <form @submit.prevent="handleSubmit">
            <Text_input
                label-text="Nome da tarefa:"
                input_id="Nome_Tarefa"
                is-required="true"
                v-model="Nome_Tarefa"
            />

            <Text_area
                label-text="Descrição da Tarefa"
                input_id="Cod_Tarefa"
                is-required="true"
                v-model="Cod_Tarefa"
            />
        </form>
    </div>

    <!-- Formulário Datas -->
    <div v-show="activeForm === 'doManually'" class="form_doManually">
        <H2_T title="Datas" />
        <form @submit.prevent="handleSubmit">
            <DateInput 
                v-model="Date_lancamento" 
                labelText="Data de Lançamento:"
            />

            <TimeInput 
                v-model="Hora_lancamento" 
                labelText="Horário de Lançamento:"
            />

            <DateInput 
                v-model="Date_entrega" 
                labelText="Data de Entrega:"
            />

            <TimeInput 
                v-model="Hora_entrega" 
                labelText="Horário de Entrega:"
            />

            <Black_button is-form="true" title="Salvar" />
        </form>
    </div>
</template>

<style scoped>
    .text-import
    {
        text-align: center;
    }
</style>