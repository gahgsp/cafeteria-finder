<script setup lang="ts">
import { toValue } from 'vue'
import { ref } from 'vue'

const emits = defineEmits(['onLogin', 'onRegister'])

const form = ref()
const name = ref('')
const password = ref('')

const requiredRule = [(value: string) => !!value || 'Esse campo é obrigatório!']

const isPasswordVisible = ref(false)

const onHandleLogin = async () => {
  const { valid } = await form.value.validate()
  if (!valid) {
    return
  }
  emits('onLogin', { name: toValue(name), password: toValue(password) })
}

const onHandleRegister = () => {
  emits('onRegister')
}
</script>

<template>
  <v-form ref="form" @submit.prevent>
    <v-container style="display: flex; justify-content: center; align-items: center">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="12">
            <span class="text-h2" style="color: #f08080">Login</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="name"
              label="Usuário"
              :rules="requiredRule"
              required
              density="compact"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              label="Senha"
              :rules="requiredRule"
              required
              density="compact"
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            style="display: flex; justify-content: space-around; align-items: center"
          >
            <v-btn variant="tonal" @click="onHandleLogin" size="large" style="color: #f4978e">
              Entrar
            </v-btn>
            <v-btn variant="tonal" size="large" @click="onHandleRegister" style="color: #f8ad9d">
              Registrar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>
