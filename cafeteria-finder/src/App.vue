<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

const store = useUserStore()
const isLoggedIn = computed(() => store.isLoggedIn())

const router = useRouter()
const location = useRoute()

function handleOnClickFinder() {
  router.push('/finder')
}

function handleOnClickFavorites() {
  router.push('/favorites')
}

function handleOnClickSettings() {
  router.push('/settings')
}
</script>

<template>
  <v-app class="main-app">
    <v-container>
      <v-row>
        <v-col cols="12">
          <AppHeader v-if="isLoggedIn" :name="store.currentUser!.name" />
          <RouterView />
          <AppFooter
            v-if="isLoggedIn"
            :current-path="location.path"
            @on-click-finder="handleOnClickFinder"
            @on-click-favorites="handleOnClickFavorites"
            @on-click-settings="handleOnClickSettings"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.main-app {
  background-color: rgba(255, 218, 185, 0.1);
  width: 100vw;
  height: 100vh;
}
</style>
