<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'
    
    import { ref, onMounted } from 'vue'
    import { getUser, processData } from '../../../public/js/utils';
    import { tbl_disciplinas } from '@/models/tbl_disciplina';
    import { tbl_curso } from '@/models/tbl_curso'

    const disciplinas = ref([]);
    const cod_curso = ref(''); // Código do curso do coordenador

    onMounted(async () => {
        // Obter usuário e permissões
        const token = window.localStorage.getItem('token');
        const user = getUser(token);
        const permissions = user.permissoes;

        // Verificar permissões
        permissions.forEach(async (permission) => {
            if (permission == "Coordenador") {
                // Carregar cursos e verificar qual pertence ao coordenador
                const cursos = await processData("http://localhost:8080/api/curso/read", tbl_curso);
                cursos.forEach((curso) => {
                    if (curso && curso['ID_Prof'] === user.id) {
                        cod_curso.value = curso['Cod_Curso']; // Código do curso do coordenador
                    }
                });
            }
            else if (permission == "Responsável") {
                // Carregar cursos e verificar qual pertence ao coordenador
                const cursos = await processData("http://localhost:8080/api/disciplinas/read", tbl_curso);
                cursos.forEach((curso) => {
                    if (curso && curso['ID_Prof'] === user.id) {
                        cod_curso.value = curso['Cod_Curso']; // Código do curso do coordenador
                    }
                });
            }
            else if (permission == "Administrador") {
                cod_curso.value = '0'; // Código do curso do administrador
            }
        });

        // Carregar disciplinas do curso 0
        const allDisciplinas = await processData("http://localhost:8080/api/disciplinas/read", tbl_disciplinas);
        disciplinas.value = allDisciplinas.filter(disciplina => disciplina.Cod_Curso === cod_curso.value || cod_curso.value === '0');
    });

</script>

<template>
    <Back_button path="/Home"/>
    <H1_T title="Disciplinas" />

    <Read_card 
        v-for="(item, index) in disciplinas" 
        :key="index" 
        :itemsData="item" 
        item1="Nome_Disc" 
        item2="ID_Disc"
        pk="ID_Disc" 
        link-update="disciplina"
        link-delete="disciplinas"
        link-read-all="/disciplinas"
    />
    
    <Create_button path="disciplina/criar" />
</template>
