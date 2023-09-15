import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const currentUser = ref(null)

    function login(newUser: any) {
        // TODO: Faz a requisição pro login.
        currentUser.value = newUser
    }

    function isLoggedIn() {
        return !!currentUser.value
    }

    return { currentUser, login, isLoggedIn }
})