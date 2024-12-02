
<script setup>
  import H1_T from '../components/text_components/h1_title/component.vue'
  import H2_T from '../components/text_components/h2_title/component.vue'
  import Text from '../components/text_components/text/component.vue'
  import Back_button from '../components/buttons/back_button/component.vue'
  import Black_button from '../components/buttons/black_button/component.vue'
  import Create_button from '../components/buttons/create_button/component.vue'
  import File_input from '../components/inputs/file_input/component.vue'
  import Text_area from '../components/inputs/text_area/component.vue'
  import Text_input from '../components/inputs/text_input/component.vue'
  import Select_input from '../components/inputs/select_input/component.vue'
  import Read_card from '../components/cards/read_card/component.vue'
</script>

<template>
    <Read_card :itemsData="['Disciplina 0001', 'TG1']"/>
    <H1_T title="Titulo H1" />
    <H2_T title="Titulo H2" />
    <Text text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer commodo blandit suscipit." />
    <Back_button path="/"/>
    <Black_button title="Button"/>
    <Black_button title="Button" isForm="true"/>
    <Create_button path="/"/>
    <File_input label-text="Label: "/>
    <Text_area input_id="textarea" labelText="Label:" placeholderText="Placeholder"/>
    <Text_input input_id="textarea" labelText="Label:" placeholderText="Placeholder"/>
    <Select_input label-text="Select:" placeholder-text="Escolha no select:" :options-data="
    [
      { value: '1', text: 'Opção 1' },
      { value: '2', text: 'Opção 2' },
      { value: '3', text: 'Opção 3' }
    ]
    " />

</template>
