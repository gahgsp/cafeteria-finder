<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

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
  </main>
</template>
