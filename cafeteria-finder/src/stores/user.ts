import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toValue } from '@vueuse/core'
import useCustomFetch from '@/composables/fetch'
import type { User } from '@/types/index'

export const useUserStore = defineStore('user', () => {
    const currentUser = ref<User | null>(null)

    async function login(user: User): Promise<{ user: User | null, isError: boolean }> {
        const { data, error } = await useCustomFetch<User>(`http://localhost:3001/users?name=${user.name}&password=${user.password}`).get().json()
        if (!error.value) {
            currentUser.value = toValue(data)[0]
            return { isError: false, user: toValue(currentUser) }
        }
        return { isError: true, user: null }
    }

    function isLoggedIn(): boolean {
        return !!currentUser.value
    }

    async function register(newUser: User): Promise<{ user: User | null, isError: boolean }> {
        const { data, error } = await useCustomFetch<User>('http://localhost:3001/users').post(newUser).json()
        currentUser.value = toValue(data)
        return { isError: !!toValue(error), user: toValue(currentUser) }
    }

    function logout() {
        currentUser.value = null
    }

    return { currentUser, login, isLoggedIn, register, logout }
})