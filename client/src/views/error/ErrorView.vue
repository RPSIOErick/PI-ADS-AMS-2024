<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue';
    import Text from '../../components/text_components/text/component.vue';
    import Back_button from '../../components/buttons/back_button/component.vue';

    import { useRoute } from 'vue-router';
    const route = useRoute();

    const error = route.query.error || 'Ocorreu um erro desconhecido.';
</script>

<template>
    <Back_button path="/home"/>
    <H1_T title="Erro" />
    <Text :text="error" />
</template>
