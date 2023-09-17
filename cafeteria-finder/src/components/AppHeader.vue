<script setup lang="ts">
const { name } = defineProps<{ name: string }>()
</script>

<template>
  <v-toolbar style="background-color: #f4978e">
    <v-toolbar-title style="color: #fff">Bem vindo, {{ name }}!</v-toolbar-title>
  </v-toolbar>
</template>
