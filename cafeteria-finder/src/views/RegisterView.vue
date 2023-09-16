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
</script>

<template>
    <main style="width: 100vw; height: 100vh;">
        <v-form ref="form" @submit.prevent>
            <v-container style="display: flex; justify-content: center; align-items: center;">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" md="12">
                            <span class="text-h2">Create Account</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="name" label="Username" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="email" label="E-Mail" hide-details required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="confirmEmail" label="Confirm E-Mail" hide-details
                                required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="password" label="Password" type="password" hide-details
                                required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" hide-details
                                required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" style="display: flex; justify-content: space-around; align-items: center;">
                            <v-btn variant="outlined" type="submit" @click="onSubmit">
                                Register
                            </v-btn>
                            <v-btn variant="outlined">
                                Cancel
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-container>
        </v-form>
    </main>
</template>