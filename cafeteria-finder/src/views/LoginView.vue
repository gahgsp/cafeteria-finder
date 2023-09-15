<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { toValue } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const router = useRouter()

const form = ref()
const name = ref('')
const password = ref('')

function handleLogin() {
    store.login({ name: toValue(name), password: toValue(password) })
    router.push('/finder')
}

function handleRegister() {
    router.push('/register')
}
</script>

<template>
    <main style="width: 100vw; height: 100vh;">
        <v-form ref="form">
            <v-container style="display: flex; justify-content: center; align-items: center;">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" md="12">
                            <span class="text-h2">Login</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="Usuário" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="Senha" type="password" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" style="display: flex; justify-content: space-around; align-items: center;">
                            <v-btn variant="outlined" @click="handleLogin">
                                Login
                            </v-btn>
                            <v-btn variant="outlined" @click="handleRegister">
                                Register
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-container>
        </v-form>
    </main>
</template>
