<script setup>
defineProps(['text', 'link', 'noBreakLine'])
</script>
<style src="./style.css"></style>

<template>
  <a :href="link" class="main_link">{{ text }}</a>
</template>


