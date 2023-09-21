<script setup lang="ts">
const { name } = defineProps<{ name: string }>()
</script>

<template>
  <v-toolbar class="secondary-background">
    <v-toolbar-title class="title">Bem vindo, {{ name }}!</v-toolbar-title>
  </v-toolbar>
</template>

<style scoped>
.secondary-background {
  background-color: #f4978e;
}

.title {
  color: #fff;
}
</style>
