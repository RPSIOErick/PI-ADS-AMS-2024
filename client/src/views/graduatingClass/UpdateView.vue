
<script setup>
    import H1_T from '../../components/text_components/h1_title/component.vue'
    import Text_input from '../../components/inputs/text_input/component.vue'
    import Black_button from '../../components/buttons/black_button/component.vue'
    import Select_input from '../../components/inputs/select_input/component.vue'
    import File_input from '../../components/inputs/file_input/component.vue'
    import Back_button from '../../components/buttons/back_button/component.vue'
</script>

<template>
    <Back_button path="/turmas"/>
    <H1_T title="Criar Turma" />

    <Text_input label-text="Nome da Turma:" placeholder-text="Nome da Turma" input_id="nome_turma"/>
    <Select_input 
      label-text="Turno:" 
      placeholder-text="Escolha o turno aqui" 
      input_id="turno_turma" 
      pk="Nome_Turno" 
      option-field="Nome_Turno" 
      :options-data="[
          {Nome_Turno: 'Manhã'},
          {Nome_Turno: 'Tarde'},
          {Nome_Turno: 'Noite'}
      ]"
    />

    <Select_input 
      label-text="Ano:" 
      placeholder-text="Escolha o ano aqui" 
      input_id="ano_turma"
      pk="Nome_Ano" 
      option-field="Nome_Ano" 
      :options-data="[
            {Nome_Ano: '1° Ano'},
            {Nome_Ano: '2° Ano'},
        ]"
    />
    <Select_input 
      label-text="Semestre:" 
      placeholder-text="Escolha o semestre aqui" 
      input_id="semestre_turma"
      pk="Nome_Semestre" 
      option-field="Nome_Semestre" 
      :options-data="[
            {Nome_Semestre: '1° Semestre'},
            {Nome_Semestre: '2° Semestre'},
            {Nome_Semestre: '3° Semestre'},
            {Nome_Semestre: '4° Semestre'},
            {Nome_Semestre: '5° Semestre'},
            {Nome_Semestre: '6° Semestre'},
            {Nome_Semestre: '7° Semestre'},
            {Nome_Semestre: '8° Semestre'},
            {Nome_Semestre: '9° Semestre'},
            {Nome_Semestre: '10° Semestre'},
        ]"
    />
    <File_input label-text="Importar Alunos: "/>
    <Black_button is-form="true" title="Salvar"/>
</template>
