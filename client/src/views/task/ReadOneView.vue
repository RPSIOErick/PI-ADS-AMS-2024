<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { processData } from '../../../public/js/utils';
    import axios from 'axios';

    import H1_T from '../../components/text_components/h1_title/component.vue';
    import H3_T from '../../components/text_components/h3_title/component.vue';
    import Text_input from '../../components/inputs/text_inputUpdate/component.vue';
    import Select_input from '../../components/inputs/select_inputUpdate/component.vue';
    import Back_button from '../../components/buttons/back_button/component.vue';
    import TextComponent from '../../components/text_components/text/component.vue';

    const route = useRoute();
    const tarefa = ref(null); 
    const mensagem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat.";

    const data = "23:59"
    const hora = "23/11/2024"

    // Função para carregar a tarefa usando o ID da rota
    const loadTarefa = async () => {
        try {
            const { id } = route.params; 
            const response = await axios.get(`/api/tarefas/${id}`); 
            tarefa.value = response.data; 
            mensagem.value = tarefa.value.Descricao || 'Sem descrição disponível.';
        } catch (error) {
            console.error('Erro ao carregar a tarefa:', error);
            mensagem.value = 'Erro ao carregar a tarefa.';
        }
    };

    // Carregar os dados da tarefa quando o componente for montado
    onMounted(() => {
        loadTarefa();
    });
    
</script>

<template>
    <Back_button path="/tarefa"/>

    <H1_T :title="'Tarefa ' + (tarefa?.ID_Tarefa || '')" />

    <H3_T :title="'Instruções'" />
    <TextComponent :text="mensagem" />

    <!-- Contêiner para alinhar data e hora -->
    <div class="date-time-container">
        <div class="date-item">
          <ion-icon name="calendar-outline"></ion-icon>
          <H3_T :title="'Data de Entrega'" />
          <TextComponent :text="tarefa?.DataEntrega || data" />
        </div>

        <div class="time-item">
          <ion-icon name="time-outline"></ion-icon>
          <H3_T :title="'Hora da Entrega'" />
          <TextComponent :text="tarefa?.HoraEntrega || hora" />
        </div>
    </div>

</template>
  
<style scoped>
  .date-time-container {
    display: flex;
    justify-content: space-between; 
    gap: 1rem; 
    margin-top: 5rem;
  }

  .date-item, .time-item{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .date-time-container ion-icon{
    font-size: 5.5vh;
  }

  .date-item, .time-item {
    display: flex;
    flex-direction: column; 
  }
</style>
  