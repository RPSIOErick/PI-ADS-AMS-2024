<script setup>
import Home_card from '../components/cards/home_card/component.vue';

</script>

<template>
    <div class="container-cards-home">
        <Home_card nome="Estudantes" link="/estudantes" />
        <Home_card nome="Professores" link="/professores" />
        <Home_card nome="Disciplinas" link="/disciplinas" />
        <Home_card nome="Cursos" link="/cursos" />
        <Home_card nome="Turmas" link="/turmas" />
        <Home_card nome="Tarefas" link="/tarefa" />
    </div>
</template>
