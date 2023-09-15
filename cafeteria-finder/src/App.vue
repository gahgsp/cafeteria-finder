<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const isLoggedIn = computed(() => store.isLoggedIn())
</script>

<template>
  <v-app>
    <v-toolbar v-if="isLoggedIn">
      <v-toolbar-title>Bem vindo, Kelvin!</v-toolbar-title>
    </v-toolbar>
    <RouterView />
    <v-bottom-navigation v-if="isLoggedIn">
      <v-btn value="search">
        <v-icon>mdi-map-marker</v-icon>
        <span>Pesquisar</span>
      </v-btn>
      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>
        <span>Favoritos</span>
      </v-btn>
      <v-btn value="settings">
        <v-icon>mdi-cog</v-icon>
        <span>Configuraçōes</span>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>