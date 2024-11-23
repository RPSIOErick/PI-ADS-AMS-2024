<script setup>
  defineProps(['path', 'title', 'isForm'])
</script>
<style src="./style.css"></style>

<template>

  <div class="container_button">
    <button class="black_button" type="submit"  v-if="isForm">
        {{ title }}
    </button>

    <button class="black_button" type="button"  v-else>
      <RouterLink :to="path || '/'">
        {{ title }}
      </RouterLink>
    </button>
  </div>


</template>


