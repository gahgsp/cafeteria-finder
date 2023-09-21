<script setup lang="ts">
import { ref } from 'vue'
import { toValue } from '@vueuse/core'

const emits = defineEmits(['onSubmit', 'onCancel'])

const form = ref()
const name = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const nameRules = ref([
  (value: string) => !!value || 'O nome de usuário é obrigatório.',
  (value: string) =>
    (!!value && value.length > 3) || 'O nome de usuário precisa possuir mais de 3 letras.',
  (value: string) =>
    (!!value && value.length <= 10) || 'O nome de usuário precisa possuir menos de 10 letras.'
])

const emailRules = ref([
  (value: string) => !!value || 'O e-mail do usuário é obrigatório.',
  (value: string) => (!!value && value.includes('@')) || 'O e-mail de usuário não é válido.'
])

const confirmEmailRules = ref([
  (value: string) => !!value || 'Por favor, confirme o seu e-mail.',
  (value: string) =>
    (!!value && value === email.value) || 'O e-mail não é idêntico ao informado anteriormente.'
])

const passwordRules = ref([
  (value: string) => !!value || 'A senha é obrigatória.',
  (value: string) =>
    (!!value && value.length >= 6) || 'A senha precisa possuir mais de 6 carácteres.',
  (value: string) =>
    (!!value && value.length >= 6 ? /\d/.test(value) : true) ||
    'A senha precisa possuir pelo menos um número.',
  (value: string) =>
    (!!value && value.length >= 6
      ? /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/.test(value)
      : true) || 'A senha precisa possuir pelo menos um carácter especial.'
])

const confirmPasswordRules = ref([
  (value: string) => !!value || 'Por favor, confirme a sua senha.',
  (value: string) =>
    (!!value && value === password.value) || 'A senha não é idêntica à informada anteriormente.'
])

const isPasswordVisible = ref(false)

const handleOnSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) {
    return
  }
  emits('onSubmit', { name: toValue(name), email: toValue(email), password: toValue(password) })
}

const handleOnCancel = () => {
  emits('onCancel')
}
</script>

<template>
  <v-form ref="form" @submit.prevent="handleOnSubmit">
    <v-container class="main-container">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="12">
            <span class="text-h2 primary">Registrar</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="name"
              label="Usuário"
              :rules="nameRules"
              required
              density="compact"
              variant="outlined"
              aria-label="Usuário"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              label="E-Mail"
              :rules="emailRules"
              required
              density="compact"
              variant="outlined"
              aria-label="E-Mail"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="confirmEmail"
              label="Confirmar E-Mail"
              :rules="confirmEmailRules"
              required
              density="compact"
              variant="outlined"
              aria-label="Confirmar E-Mail"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              label="Senha"
              :rules="passwordRules"
              required
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              variant="outlined"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              density="compact"
              aria-label="Senha"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="confirmPassword"
              label="Confirmar Senha"
              :rules="confirmPasswordRules"
              required
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              variant="outlined"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              density="compact"
              aria-label="Confirmar Senha"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="actions-container">
            <v-btn
              type="submit"
              variant="tonal"
              size="large"
              class="secondary"
              aria-label="Registrar"
            >
              Registrar
            </v-btn>
            <v-btn
              variant="tonal"
              size="large"
              @click="handleOnCancel"
              class="terciary"
              aria-label="Cancelar"
              data-testid="cancel-button"
            >
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.primary {
  color: #f08080;
}

.secondary {
  color: #f4978e;
}

.terciary {
  color: #f8ad9d;
}

.actions-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
