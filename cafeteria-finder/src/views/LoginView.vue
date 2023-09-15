<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
const router = useRouter()

function handleLogin() {
    store.login({ name: 'kelvin', password: '123456' })
    router.push('/finder')
}
</script>

<template>
    <main style="width: 100vw; height: 100vh;">
        <v-form>
            <v-container style="display: flex; justify-content: center; align-items: center;">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" md="12">
                            <span class="text-h2">Login</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="E-mail" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field label="Password" type="password" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" style="display: flex; justify-content: space-around; align-items: center;">
                            <v-btn variant="outlined" @click="handleLogin">
                                Login
                            </v-btn>
                            <v-btn variant="outlined">
                                Register
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-container>
        </v-form>
    </main>
</template>
