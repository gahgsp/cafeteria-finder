<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter()
const userStore = useUserStore()

function handleLogout() {
    userStore.logout()
    router.push('/login')
}

async function handleDeleteUser() {
    const { isError } = await userStore.deleteUser(userStore.currentUser!)
    if (!isError) {
        userStore.logout()
        router.push('/login')
    }
}

</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-list density="compact">
                        <v-list-item link @click="handleDeleteUser">
                            <v-list-item-title class="text-body-1">Excluir Conta</v-list-item-title>
                            <template v-slot:append>
                                <v-avatar color="#FFDAB9">
                                    <v-icon color="white">mdi-delete</v-icon>
                                </v-avatar>
                            </template>
                        </v-list-item>
                        <v-divider />
                        <v-list-item link @click="handleLogout">
                            <v-list-item-title class="text-body-1">Encerrar Sessão</v-list-item-title>
                            <template v-slot:append>
                                <v-avatar color="#F08080">
                                    <v-icon color="white">mdi-logout</v-icon>
                                </v-avatar>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>