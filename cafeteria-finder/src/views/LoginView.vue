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

const isErrorAlert = ref(false)

async function handleLogin() {
    const { isError } = await store.login({ name: toValue(name), password: toValue(password) })
    if (!isError) {
        router.push('/finder')
    }
    isErrorAlert.value = true
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
                            <v-text-field v-model="name" label="Usuário" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="password" label="Senha" type="password" hide-details
                                required></v-text-field>
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
        <v-snackbar v-model="isErrorAlert" timeout="5000"><span>Um erro ocorreu!</span><br /><span>Verifique se os dados
                estão corretos.</span><template v-slot:actions>
                <v-btn color="red" variant="text" @click="isErrorAlert = false">
                    Fechar
                </v-btn>
            </template></v-snackbar>
    </main>
</template>
