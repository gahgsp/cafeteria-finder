import { defineStore } from 'pinia'
import useCustomFetch from '@/composables/fetch'
import { toValue } from '@vueuse/core'
import { useUserStore } from '@/stores/user'
import type { Favorite } from '@/types'

export const useFavoritesStore = defineStore('favorites', () => {
  const userStore = useUserStore()

  async function loadFavorites(): Promise<{ favorites: Favorite[]; isError: boolean }> {
    const { data, error } = await useCustomFetch<Favorite[]>(
      `/favorites?userId=${toValue(userStore.currentUser)?.id}`
    )
      .get()
      .json()
    return { favorites: toValue(data), isError: !!toValue(error) }
  }

  async function saveFavorite(
    coffeeShopId: number
  ): Promise<{ favorite: Favorite; isError: boolean }> {
    const { data, error } = await useCustomFetch<Favorite>('/favorites')
      .post({ coffeeShopId, userId: toValue(userStore.currentUser)?.id })
      .json()
    return { isError: !!toValue(error), favorite: toValue(data) }
  }

  return { loadFavorites, saveFavorite }
})
