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

const isPasswordVisible = ref(false)

const handleOnSubmit = () => {
  emits('onSubmit', { name: toValue(name), email: toValue(email), password: toValue(password) })
}

const handleOnCancel = () => {
  emits('onCancel')
}
</script>

<template>
  <v-form ref="form" @submit.prevent>
    <v-container style="display: flex; justify-content: center; align-items: center">
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="12">
            <span class="text-h2" style="color: #f08080">Registrar</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="name"
              label="Usuário"
              hide-details
              required
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              label="E-Mail"
              hide-details
              required
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="confirmEmail"
              label="Confirmar E-Mail"
              hide-details
              required
              density="compact"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="password"
              label="Senha"
              hide-details
              required
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              variant="outlined"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="confirmPassword"
              label="Confirmar Senha"
              hide-details
              required
              :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible ? 'text' : 'password'"
              variant="outlined"
              @click:append-inner="isPasswordVisible = !isPasswordVisible"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            style="display: flex; justify-content: space-around; align-items: center"
          >
            <v-btn
              variant="tonal"
              type="submit"
              @click="handleOnSubmit"
              size="large"
              style="color: #f4978e"
            >
              Registrar
            </v-btn>
            <v-btn variant="tonal" size="large" style="color: #f8ad9d" @click="handleOnCancel">
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
  </v-form>
</template>
