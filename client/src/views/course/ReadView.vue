<script setup>
import H1_T from '../../components/text_components/h1_title/component.vue'
import Back_button from '../../components/buttons/back_button/component.vue'
import Create_button from '../../components/buttons/create_button/component.vue'
import Read_card from '../../components/cards/read_card/component.vue'

import { ref, onMounted } from 'vue'
import { getUser, processData } from '../../../public/js/utils';
import { tbl_curso } from '@/models/tbl_curso'

const cursos = ref([]);
const cod_curso = ref(''); // Código do curso do coordenador

onMounted(async () => {
    // Obter cursos
    const allCursos = await processData("http://localhost:8080/api/curso/read", tbl_curso);

    // Obter usuário e permissões
    const token = window.localStorage.getItem('token');
    const user = getUser(token);
    const permissions = user.permissoes;

    // Verificar permissões
    permissions.forEach(async (permission) => {
        if (permission === "Coordenador") {
            // Identificar o curso do coordenador
            allCursos.forEach((curso) => {
                if (curso && curso['ID_Prof'] === user.id) {
                    cod_curso.value = curso['Cod_Curso'];
                }
            });

            // Filtrar cursos para exibir apenas o do coordenador
            cursos.value = allCursos.filter(curso => curso['Cod_Curso'] === cod_curso.value);
        }
        else if (permission === "Administrador") {

            // Exibir todos os cursos
            cursos.value = allCursos;

        }
    });
});
</script>

<template>
    <Back_button path="/Home" />
    <H1_T title="Cursos" />
    
    <!-- Exibe apenas os cursos pertencentes ao coordenador -->
    <div v-for="(item, index) in cursos" :key="index">
        <Read_card 
            v-if="item['Status'] === true" 
            :itemsData="item" 
            item1="Nome_Curso" 
            item2="Descricao_Trabalho" 
            pk="Cod_Curso" 
            linkUpdate="curso"
            linkDelete="curso"
            linkReadAll="/cursos"
            use-status="1"
        />
    </div>

    <Create_button path="curso/criar" />
</template>
