<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
    import Create_button from '../../components/buttons/create_button/component.vue'
    import Read_card from '../../components/cards/read_card/component.vue'
    
    import { ref, onMounted } from 'vue'
    import { getUser, processData } from '../../../public/js/utils';
    import { tbl_aluno } from '@/models/tbl_aluno';
    import { tbl_curso } from '@/models/tbl_curso';
import { tbl_disciplinas } from '@/models/tbl_disciplina'

    const estudantes = ref([]);
    const cod_curso = ref(''); // Código do curso do coordenador
    const disciplinasResponsavel = ref([]); // Disciplinas do responsável
    const permissions = ref([]); // Guardar permissões do usuário

    onMounted(async () => {
        // Obter usuário e permissões
        const token = window.localStorage.getItem('token');
        const user = getUser(token);
        permissions.value = user.permissoes;

        for (const permission of permissions.value) 
        {
            if (permission === "Coordenador") 
            {
                // Carregar cursos e verificar qual pertence ao coordenador
                const cursos = await processData("http://localhost:8080/api/curso/read", tbl_curso);
                cursos.forEach((curso) => 
                {
                    if (curso && curso['ID_Prof'] === user.id)
                    {
                        cod_curso.value = curso['Cod_Curso']; // Código do curso do coordenador
                    }
                });

                // Carregar os estudantes do curso do coordenador
                const allEstudantes = await processData("http://localhost:8080/api/aluno/read", tbl_aluno);
                estudantes.value = allEstudantes.filter(estudante => estudante.Cod_Curso === cod_curso.value);
            } else if (permission === "Responsável") {
                // Carregar disciplinas do responsável
                const disciplinas = await processData("http://localhost:8080/api/disciplinas/read", tbl_disciplinas);
                disciplinasResponsavel.value = disciplinas.filter(disciplina => disciplina.ID_Responsavel === user.id);

                // Carregar os estudantes das disciplinas do responsável
                const allEstudantes = await processData("http://localhost:8080/api/aluno/read", tbl_aluno);
                estudantes.value = allEstudantes.filter(estudante => {
                    // Verificar se o estudante está em alguma disciplina do responsável
                    return disciplinasResponsavel.value.some(disciplina => disciplina.Cod_Disc === estudante.Cod_Disc);
                });

            }
            else
            {
                return estudantes.value = await processData("http://localhost:8080/api/aluno/read", tbl_aluno);

            }
        }
    });
</script>

<template>
    <Back_button path="/Home"/>
    <H1_T title="Estudantes" />

    <Read_card 
        v-for="(item, index) in estudantes" 
        :key="index" 
        :itemsData="item" 
        item1="Nome" 
        item2="RA" 
        pk="Cod_Aluno" 
        linkUpdate="estudante"
        linkDelete="aluno"
        linkReadAll="/estudantes"
        :conditionalID="permissions.length > 0 && permissions.includes('Coordenador') ? cod_curso : null" 
        :conditionalField="permissions.length > 0 && permissions.includes('Coordenador') ? 'Cod_Curso' : 'Cod_Disc'"  
    />

    <Create_button path="estudante/criar" />
</template>
