<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toValue } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types'

const router = useRouter()

const userStore = useUserStore()

const form = ref()
const name = ref('')
const email = ref('')
const confirmEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const isPasswordVisible = ref(false)

async function onSubmit() {
    const newUser: User = {
        name: toValue(name),
        email: toValue(email),
        password: toValue(password)
    }
    const { isError } = await userStore.register(newUser)
    if (!isError) {
        router.push('/finder')
    }
}

function onCancel() {
    router.push('/login')
}
</script>

<template>
    <main>
        <v-form ref="form" @submit.prevent>
            <v-container style="display: flex; justify-content: center; align-items: center;">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" md="12">
                            <span class="text-h2" style="color: #F08080;">Registrar</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="name" label="Usuário" hide-details required density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="email" label="E-Mail" hide-details required density="compact"
                                variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="confirmEmail" label="Confirmar E-Mail" hide-details required
                                density="compact" variant="outlined"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="password" label="Senha" hide-details required
                                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="isPasswordVisible ? 'text' : 'password'" variant="outlined"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="confirmPassword" label="Confirmar Senha" hide-details required
                                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="isPasswordVisible ? 'text' : 'password'" variant="outlined"
                                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                density="compact"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" style="display: flex; justify-content: space-around; align-items: center;">
                            <v-btn variant="tonal" type="submit" @click="onSubmit" size="large" style="color:#F4978E;">
                                Registrar
                            </v-btn>
                            <v-btn variant="tonal" size="large" style="color:#F8AD9D;" @click="onCancel">
                                Cancelar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-container>
        </v-form>
    </main>
</template>