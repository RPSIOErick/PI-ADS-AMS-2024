<script setup>
import { defineProps } from 'vue';
import delete_icon from "/img/icons/Delete.svg?url";
import update_icon from "/img/icons/Update.svg?url";
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { updateData } from '../../../../public/js/utils';


const props = defineProps({
  linkUpdate: String,
  linkDelete: String,
  linkReadAll: String,
  itemsData: Object,
  pk: String,
  item1: String,
  item2: String,
  useStatus: Boolean // Novo prop para definir qual função usar
});

function read_card_action(pk) {
  const read_card = document.getElementById("read-card-" + pk);
  if (read_card) {
    read_card.className = read_card.className === "read-card-close" ? "read-card-open" : "read-card-close";
  }
}

async function handleDeleteById(linkDelete) {
  try 
  {
    await axios.delete(linkDelete);
    toast.success("Registro deletado com sucesso!");
    window.location.assign(props.linkReadAll);
  } 
  catch (error) 
  {
    if (error.response && error.response.data.error) 
    {
      toast.error(error.response.data.error);
    } 
    else 
    {
      toast.error("Erro ao tentar deletar o registro.");
    }
  }
}

async function handleDeleteByStatus(linkDelete) 
{
  try 
  {
    await axios.put(linkDelete);
    toast.success("Registro deletado com sucesso!")
    window.location.assign(`${linkReadAll}`);
  } 
  catch (error) 
  {
    if (error.response && error.response.data.error) 
    {
      toast.error(error.response.data.error);
    } 
    else 
    {
      toast.error("Erro ao tentar deletar o registro.");
    }
  }
}
</script>

<template>
  <div class="read-card-close" :id="'read-card-' + itemsData[pk]">
    <div class="header-readCard">
      <ul class="items-cardRead">
        <li v-if="itemsData[item1]" class="firstItem-cardRead">
          {{ itemsData[item1] }}
        </li>
        <li v-if="itemsData[item2]">
          {{ itemsData[item2] }}
        </li>
      </ul>

      <a :href="linkUpdate + '/' + itemsData[pk]">
        <button type="button" class="btn-read">Visualizar</button>
      </a>

      <button type="button" class="btn-verMais" @click="read_card_action(itemsData[pk])">
        Ver Mais
      </button>
    </div>
    
    <div class="container-crudActions">
      <a :href="linkUpdate + '/editar/' + itemsData[pk]">
        <button type="button" class="btn-crudActions btn-update">
          <img :src="update_icon" alt="Icone botão editar">Editar
        </button>
      </a>

      <form 
        @submit.prevent="
          useStatus 
            ? handleDeleteByStatus(`http://localhost:8080/api/${linkDelete}/status/${itemsData[pk]}`) 
            : handleDeleteById(`http://localhost:8080/api/${linkDelete}/delete/${itemsData[pk]}`)
        ">
        <button type="submit" class="btn-crudActions btn-delete">
          <img :src="delete_icon" alt="Icone botão apagar">Apagar
        </button>
      </form>
    </div>
  </div>
</template>

<style src="./style.css"></style>
