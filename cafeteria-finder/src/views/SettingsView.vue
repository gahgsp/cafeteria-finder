<script setup lang="ts">
import SettingsMenu from '@/components/SettingsMenu.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

function handleOnLogout() {
  userStore.logout()
  router.push('/login')
}

async function handleOnDeleteUser() {
  const { isError } = await userStore.deleteUser(userStore.currentUser!)
  if (!isError) {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<template>
  <v-main>
    <SettingsMenu @on-logout="handleOnLogout" @on-delete-user="handleOnDeleteUser" />
  </v-main>
</template>
