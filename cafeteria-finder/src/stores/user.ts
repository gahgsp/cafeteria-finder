import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toValue } from '@vueuse/core'
import useCustomFetch from '@/composables/fetch'

export const useUserStore = defineStore('user', () => {
    const currentUser = ref<any>(null)

    async function login(user: any) {
        const { data, error } = await useCustomFetch(`http://localhost:3001/users?name=${user.name}&password=${user.password}`)
        if (!error.value) {
            currentUser.value = JSON.parse(toValue(data))[0]
            return { isError: false, user: toValue(currentUser) }
        }
        return { isError: true, user: null }
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