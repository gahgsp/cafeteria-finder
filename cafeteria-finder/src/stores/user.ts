import { ref } from 'vue'
import { defineStore } from 'pinia'
import { toValue } from '@vueuse/core'
import useCustomFetch from '@/composables/fetch'
import type { User } from '@/types/index'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<User | null>(null)

  async function login(
    user: Omit<User, 'id' | 'email'>
  ): Promise<{ user: User | null; isError: boolean }> {
    const { data, error } = await useCustomFetch<User>(
      `/users?name=${user.name}&password=${user.password}`
    )
      .get()
      .json()
    if (!error.value) {
      currentUser.value = toValue(data)[0]
      return { isError: false, user: toValue(currentUser) }
    }
    return { isError: true, user: null }
  }

  function isLoggedIn(): boolean {
    return !!currentUser.value
  }

  async function register(newUser: User): Promise<{ user: User | null; isError: boolean }> {
    const { data, error } = await useCustomFetch<User>('/users').post(newUser).json()
    currentUser.value = toValue(data)
    return { isError: !!toValue(error), user: toValue(currentUser) }
  }

  function logout() {
    currentUser.value = null
  }

  async function deleteUser(userToBeDeleted: User) {
    const { data, error } = await useCustomFetch(`/users/${userToBeDeleted.id}`).delete().json()
    return { data: toValue(data), isError: !!toValue(error) }
  }

  return { currentUser, login, isLoggedIn, register, logout, deleteUser }
})
