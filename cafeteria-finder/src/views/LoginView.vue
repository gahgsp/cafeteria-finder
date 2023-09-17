<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const isErrorAlert = ref(false)

async function handleOnLogin(formData: { name: string; password: string }) {
  const { isError } = await store.login({ name: formData.name, password: formData.password })
  if (!isError) {
    router.push('/finder')
  }
  isErrorAlert.value = true
}

function handleOnRegister() {
  router.push('/register')
}
</script>

<template>
  <main>
    <LoginForm @on-login="handleOnLogin" @on-register="handleOnRegister" />
    <v-snackbar v-model="isErrorAlert" timeout="5000" color="#F08080" variant="tonal">
      <span>Um erro ocorreu!</span>
      <br />
      <span>Verifique se os dados estão corretos.</span>
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="isErrorAlert = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </main>
</template>
