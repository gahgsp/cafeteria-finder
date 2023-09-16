<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const isLoggedIn = computed(() => store.isLoggedIn())

const router = useRouter()
const location = useRoute()

function onClickFinder() {
  router.push('/finder')
}

function onClickFavorites() {
  router.push('/favorites')
}

function onClickSettings() {
  router.push('/settings')
}

function isCurrentPath(path: string) {
  return location.path === path
}

</script>

<template>
  <v-app style="background-color: rgba(255, 218, 185, 0.1); width: 100vw; height: 100vh;">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-toolbar v-if="isLoggedIn" style="background-color: #F4978E;">
            <v-toolbar-title style="color: #FFF">Bem vindo, {{ store.currentUser?.name }}!</v-toolbar-title>
          </v-toolbar>
          <RouterView />
          <v-bottom-navigation v-if="isLoggedIn">
            <v-btn value="finder" @click="onClickFinder" :disabled="isCurrentPath('/finder')" style="color: #F4978E;">
              <v-icon>mdi-map-marker</v-icon>
              <span>Pesquisar</span>
            </v-btn>
            <v-btn value="favorites" @click="onClickFavorites" :disabled="isCurrentPath('/favorites')"
              style="color: #F4978E;">
              <v-icon>mdi-heart</v-icon>
              <span>Favoritos</span>
            </v-btn>
            <v-btn value="settings" @click="onClickSettings" :disabled="isCurrentPath('/settings')"
              style="color: #F4978E;">
              <v-icon>mdi-cog</v-icon>
              <span>Configuraçōes</span>
            </v-btn>
          </v-bottom-navigation>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>