<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const isErrorAlert = ref(false)

const handleOnSubmit = async (formData: { name: string; email: string; password: string }) => {
  const newUser: User = {
    name: formData.name,
    email: formData.email,
    password: formData.password
  }
  const { isError } = await userStore.register(newUser)
  if (!isError) {
    router.push('/finder')
  }
}

const handleOnCancel = () => {
  router.push('/login')
}
</script>

<template>
  <main>
    <RegisterForm @on-submit="handleOnSubmit" @on-cancel="handleOnCancel" />
    <v-snackbar v-model="isErrorAlert" timeout="5000" color="#F08080" variant="tonal">
      <span>Um erro ocorreu!</span>
      <br />
      <span>Houve um erro ao registrar seu usuário.</span>
      <br />
      <span>Verifique as informações e tente novamente mais tarde.</span>
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="isErrorAlert = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </main>
</template>
