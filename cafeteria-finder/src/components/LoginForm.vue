<script setup lang="ts">
import { toValue } from 'vue'
import { ref } from 'vue'

const emits = defineEmits(['onLogin', 'onRegister'])

const form = ref()
const name = ref('')
const password = ref('')

const requiredRule = ref([(value: string) => !!value || 'Esse campo é obrigatório!'])

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
  <v-form ref="form" @submit.prevent="onHandleLogin">
    <v-container class="main-container">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="12">
            <span class="text-h2 primary">Login</span>
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
              aria-label="Usuário"
            />
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
              aria-label="Senha"
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
              data-testid="login-button"
              aria-label="Entrar"
            >
              Entrar
            </v-btn>
            <v-btn
              variant="tonal"
              size="large"
              @click="onHandleRegister"
              class="terciary"
              data-testid="register-button"
              aria-label="Registrar"
            >
              Registrar
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
