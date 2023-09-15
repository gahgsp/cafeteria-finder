import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toValue } from '@vueuse/core'
import useCustomFetch from '@/composables/fetch'

export const useUserStore = defineStore('user', () => {
    const currentUser = ref<any>(null)

    function login(newUser: any) {
        currentUser.value = newUser
    }

    function isLoggedIn() {
        return !!currentUser.value
    }

    async function register(newUser: any) {
        const { data, error } = await useCustomFetch('http://localhost:3001/users').post(newUser)
        currentUser.value = toValue(data)
        return { isError: !!error.value, user: JSON.parse(toValue(currentUser)) }
    }

    return { currentUser, login, isLoggedIn, register }
})